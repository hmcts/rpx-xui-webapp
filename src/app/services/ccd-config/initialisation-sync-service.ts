import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';

@Injectable()
export class InitialisationSyncService {
  private init$ = new BehaviorSubject<boolean>(false);
  private isComplete = false;
  private subscriptions: Subscription[] = [];
  private timeoutSubscription?: Subscription;
  private readonly LD_TIMEOUT: number = 10000; // timeout value in milliseconds

  private observer = {
    complete: () => {
      this.isComplete = true;
      this.subscriptions.forEach((s) => s.unsubscribe());
      this.subscriptions = [];
      if (this.timeoutSubscription) {
        this.timeoutSubscription.unsubscribe();
        this.timeoutSubscription = undefined;
      }
    }
  };

  public constructor() {
    this.init$.subscribe(this.observer);
  }

  // Call this function when initialisation (in this case, LaunchDarkly initialisation) has completed
  public initialisationComplete(complete = true): void {
    // Prevent calling complete more than once
    if (this.isComplete) return;

    console.log(`InitialisationSyncService: initialisationComplete: ${complete}`);
    this.init$.next(complete);
    this.init$.complete();
  }

  // Call this function to specify code to be run after initialisation has completed
  // calls the supplied callback when the initialisationComplete function has been called
  // Register a callback to run after initialisation completes
  public waitForInitialisation(callback: (arg:boolean) => void): void {
    console.log('InitialiseSyncService: waitForInitialisation');
    // No need to wait if the initilisation has already completed
    if (!this.isComplete) {
      // Start a timeout that will call initialisationComplete(false) after 10 seconds
      this.timeoutSubscription = timer(this.LD_TIMEOUT).subscribe(() => {
        console.warn('InitialisationSyncService: Timeout exceeded, marking initialisation as failed.');
        this.initialisationComplete(false);
      });

      this.subscriptions.push(this.init$.subscribe(callback));
    } else {
      console.log('Initialisation complete before waitForInitialisation called, calling callback directly');
      callback(true);
    }
  }

  public getSubscriptionCount() {
    return this.subscriptions.length;
  }
}

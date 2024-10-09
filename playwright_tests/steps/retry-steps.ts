export async function retryAction(action: () => Promise<void>, numberOfTries: number = 5) {
    for (let i = 0; i < numberOfTries; i++) {
      try {
        await action();
        break; 
      } catch (error) {
        console.log(`Action failed, retrying (${i + 1}/${numberOfTries})...`);
        if (i === numberOfTries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

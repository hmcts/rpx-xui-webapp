export async function reconcileClaimedTask({
  claimAttempted,
  claimConfirmed,
  taskId,
  findClaimedTask,
  releaseClaimedTask,
}: {
  claimAttempted: boolean;
  claimConfirmed: boolean;
  taskId: string;
  findClaimedTask: () => Promise<number | undefined>;
  releaseClaimedTask: (rowIndex: number) => Promise<void>;
}): Promise<'not-attempted' | 'not-claimed' | 'released'> {
  if (!claimAttempted) {
    return 'not-attempted';
  }
  if (!taskId.trim()) {
    throw new Error('Cannot reconcile a claimed task without its exact task ID.');
  }
  const rowIndex = await findClaimedTask();
  if (rowIndex === undefined) {
    if (claimConfirmed) {
      throw new Error(`Confirmed claimed task ${taskId} could not be found for cleanup.`);
    }
    return 'not-claimed';
  }
  await releaseClaimedTask(rowIndex);
  return 'released';
}

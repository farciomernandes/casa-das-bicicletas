export abstract class IProcessPendingOrders {
  abstract execute(): Promise<void>;
}

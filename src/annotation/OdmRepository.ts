import {ConnectionManager} from "../connection/ConnectionManager";

export function OdmRepository(className: Function, connectionName?: string): Function;
export function OdmRepository(className: string, connectionName?: string): Function;
export function OdmRepository(className: Function|string, connectionName?: string): Function {
    return function(target: Function, key: string, index: number) {

        let container: any;
        try {
            container = require('typedi/Container').Container;
        } catch (err) {
            throw new Error('OdmRepository cannot be used because typedi extension is not installed.');
        }

        container.registerCustomParamHandler({
            type: target,
            index: index,
            getValue: () => {
                let connectionManager: ConnectionManager = container.get(ConnectionManager);
                let connection = connectionManager.getConnection(connectionName);
                return connection.getRepository(<Function> className);
            }
        });

    }
}

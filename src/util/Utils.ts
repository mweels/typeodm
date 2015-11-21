import * as fs from 'fs';
import * as path from 'path';
import {ObjectID} from "mongodb";

/**
 * Common utility functions.
 */
export class OdmUtils {

    /**
     * Creates ObjectId object from a given objectId string.
     */
    createObjectIdFromString(objectId: string): ObjectID {
        return this.createObjectId(objectId, true);
    }

    /**
     * Creates array of ObjectId objects from a given objectId strings.
     */
    createObjectIdsFromStrings(objectIds: string[]): ObjectID[] {
        return objectIds.map(id => this.createObjectId(id, true));
    }

    createObjectId(id: any, isObjectId: boolean): any {
        return isObjectId && !this.isObjectId(id) ? new ObjectID(id) : id;
    }

    isObjectId(id: any): boolean {
        return id instanceof ObjectID;
    }

    /**
     * Makes "require()" all js files (or custom extension files) in the given directory.
     * @deprecated use npm module instead
     */
    static requireAll(directories: string[], extension: string = '.js'): any[] {
        let files: any[] = [];
        directories.forEach((dir: string) => {
            if (fs.existsSync(dir)) {
                fs.readdirSync(dir).forEach((file: string) => {
                    if (fs.statSync(dir + '/' + file).isDirectory()) {
                        let requiredFiles = this.requireAll([dir + '/' + file], extension);
                        requiredFiles.forEach((file: string) => files.push(file));
                    } else if (path.extname(file) === extension) {
                        files.push(require(dir + '/' + file));
                    }
                });
            }
        }); // todo: implement recursion
        return files;
    }

}
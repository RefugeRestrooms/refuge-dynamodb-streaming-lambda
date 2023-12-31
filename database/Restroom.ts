import {attribute, hashKey, table} from "@aws/dynamodb-data-mapper-annotations";

export const now = (): Date => new Date();

@table("restrooms")
export class Restroom {
    @hashKey()
    partitionKey!: string;

    @hashKey()
    sortKey!: string;

    @attribute()
    name!: string;

    @attribute({defaultProvider: () => now().toISOString()})
    updatedOn?: string;
}
export type ModelPublic = {
    id:number,
    rel_id: number,
    name: string
}
export type ModelUpdate = {
    id:number,
    rel_id: number,
    name: string
}
export type RelModelPublic = {
    id: number,
    name: string
}
export type ModelDeleteModelData = {
id:number,
}

interface ModelDeleteProps{
    id: number
}

interface ModelUpdateProps{
    id: number,
    requestBody: { data: ModelUpdate}
}

export class ModelService {

    static async readModels() {
        const models = [
            {'id':1, 'rel_id':1,'name':'Name 1' },
            {'id':2, 'rel_id':1,'name':'Name 2' },
            {'id':3, 'rel_id':2,'name':'Name 3' },
        ]
        return models
        throw new Error('Method not implemented.')
    }
    
    static async deleteModel({ id } : ModelDeleteProps) {
        console.log(id)
        throw new Error('Method not implemented.')
    }
    static async updateModel({ id, requestBody } : ModelUpdateProps) {
        console.log(id, requestBody)
        throw new Error('Method not implemented.')
    }

}
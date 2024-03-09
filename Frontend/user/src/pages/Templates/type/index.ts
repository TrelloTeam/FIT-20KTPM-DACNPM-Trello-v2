export interface Workspace {
    _id: string
    name: string
    short_name: string
    description: string
    website: string
    logo: string
    type_id: string
    owner_email: string
    visibility: string
    members_email: Array<string>
}
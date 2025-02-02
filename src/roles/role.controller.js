import Role from './role.model.js'

export class roleController {
    async getRoles(req, res) {
        try {
            res.json('getRoles')
        } catch (error) {
            console.log(error)
        }
    }

    async createRole(req, res) {
        try {
            const userRole = new Role()
            const adminRole = new Role({value: "ADMIN"})
            
            await userRole.save()
            await adminRole.save()
            res.json('createRole')
        } catch (error) {
            console.log(error)
            res.status(404).json('ERROR')
        }
    }
}

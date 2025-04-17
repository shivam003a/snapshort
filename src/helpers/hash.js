import bcrypt from 'bcryptjs'

export const hashPassword = async (pass) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(pass, salt)
}

export const comparePassword = async (pass, hashedPass) => {
    return await bcrypt.compare(pass, hashedPass)
}
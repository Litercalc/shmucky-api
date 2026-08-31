
import crypto from "crypto"

export default function generateSessionService() {
    const token =  crypto.randomBytes(20).toString('hex')

    const tokenExpiry = new Date(Date.now() + (30 * 24* 60 * 60 * 1000))

    return {token, tokenExpiry}
}
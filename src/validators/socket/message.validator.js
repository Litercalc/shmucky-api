
export default function messageValidator(message) {

    if (message.length >= 3 && message.length <= 50) return true
    return false
}
export type User = {
    userId: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    dateOfBirth: string,
    description?: string,
    gender: string,
    joinDate: string,
    profilePicture: string
}

export type SuggestedFriend = {
    userId: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    dateOfBirth: string,
    description?: string,
    gender: string,
    joinDate: string,
    profilePicture: string
    commonFriend: User
}
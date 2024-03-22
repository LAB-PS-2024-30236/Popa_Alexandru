export type UserSession = {
    token: string;
    userId: string;
    fullName: string;
    email: string;
    phoneNumber: number;
    profilePicture: string;
    username: string;
    language: string;
}

export type UserResponse = {
    token: string;
    user: UserType;
}

export type UserType = {
    userId: string;
    firstName: string;
    lastName: string;
    bio?: string;
    birthdate: string;
    isPrivate: boolean;
    status: boolean;
    profilePicture: string;
    email: string;
    phoneNumber: number;
    username: string;
    language: string;
}
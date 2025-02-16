import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCollection } from '@/lib/mongodb';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }},
            async authorize(credentials, req) {
                const usersCollection = await getCollection("users");
                const user = await usersCollection.findOne({ username: credentials.username, password: credentials.password })
                if (user) {
                    return { id: user._id, name: user.username }
                } else {
                    return null;
                }
            }})],
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);

import UserModel from '../model/userModel';
import user from '../types/user';
import bcrypt from 'bcrypt';

interface FetchUserResponse {
    success: boolean;
    user?: user;
}

interface UpdateProfileResponse {
    success: boolean;
}

const SALT_ROUNDS = 10;

const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

const getUserDetails = (email: string): Promise<FetchUserResponse> => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ where: { email } })
            .then(user => {
                if (!user) {
                    resolve({ success: false });
                } else {
                    resolve({
                        success: true,
                        user: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            userName: user.userName,
                            password: user.password,
                            email: user.email,
                            mobileNumber: user.mobileNumber,
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error in fetching details:', error);
                reject({ success: false });
            });
    });
}

const updateProfile = async (userDetailsToUpdate: user): Promise<UpdateProfileResponse> => {
    let { firstName, lastName, userName, password, mobileNumber, email } = userDetailsToUpdate;
    const hashedPassword = await hashPassword(password);
    return new Promise((resolve, reject) => {
        UserModel
            .update({ firstName, lastName, userName, password: hashedPassword, mobileNumber }, { where: { email: email } })
            .then((responseAfterUpdateProfile) => {
                resolve({
                    success: true
                });
            })
            .catch(error => {
                console.error('Error in updating Profile:', error);
                reject({ success: false });
            });
    });
}

export default { getUserDetails, updateProfile };
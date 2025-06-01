import API from '../../../utils/API';
import { routes } from '../../../utils/Constants';
import { setUserDetails, setToken } from '../../reducers/auth';
import { store } from '../../store';

export const LoginAPI = async (data) => {
  return new Promise((resolve, reject) => {
    console.log('routes.login', routes.login)
    API.post(routes.login, data, {
      toast: true,
      message: 'Login Successfully!'
    })
    .then(e => {
      const respose = e?.data?.data;
      console.log('respose', respose)
      store.dispatch(setUserDetails(respose));
      store.dispatch(setToken(respose?.token));

      resolve(respose);
    })
    .catch(err => {
      const status = err?.response?.status;
      const errorData = err?.response?.data;

      console.log('LoginAPI err', {
        status,
        errorData
      });

      reject({
        status,
        errorData
      });
    })
    .finally(() => {
      
    });
  });
};

export const ResetPassword = async (data) => {
  return new Promise((resolve, reject) => {
    API.post(routes.resetPassword, data,  {
      toast: true,
      message: 'Your password has been successfully reset!'
    })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
    .finally(() => {
      
    });
  });
};

export const ForgotPasswordAPI = async (data) => {
  return new Promise((resolve, reject) => {
    API.post(routes.forgotPassword, data,  { toast: true, message: 'Email sent successfully!' })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
    .finally(() => {
      
    });
  });
};

export const ChangePasswordAPI = async (data) => {
  return new Promise((resolve, reject) => {
    API.put(routes.changePassword, data,  { toast: true, message: 'Change password successfully!' })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      console.log('err', err)
      reject(err);
    })
    .finally(() => {
      
    });
  });
}

export const ResetPasswordByEmailAPI = async (data) => {
  return new Promise((resolve, reject) => {
    API.post(routes.resetPasswordByEmail, data,  { toast: true, message: 'Change password successfully!' })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      console.log('err', err)
      reject(err);
    })
    .finally(() => {
      
    });
  });
}

// export const RegisterUserAPI = async (data) => {
//   API.post(Routes.register, data)
//     .then(e => {
//       console.log('LoginAPI res', e?.data);

//       store.dispatch(setUserDetails(e?.data?.data?.user));
//       store.dispatch(setToken(e?.data?.data?.user?.token));
//     })
//     .catch(err => {

//     })
//     .finally(() => {
      
//     });
// };

// export const VerifyResetPasswordOtp = async (data) => {
//   return new Promise((resolve, reject) => {
//     API.post(Routes.verifyResetPasswordOtp, data,  { toast: true })
//     .then(res => {
//       resolve(res);
//     })
//     .catch(err => {
//       reject(err);
//     })
//     .finally(() => {
      
//     });
//   });
// };

// export const GetUserInfo = async () => {
//   return new Promise((resolve, reject) => {
//     API.get(Routes.user)
//     .then(e => {
//       store.dispatch(setUserDetails(e?.data?.data?.user));
      
//       resolve(e);
//     })
//     .catch(err => {
//       reject(err);
//     })
//     .finally(() => {
      
//     });
//   });
// };

// export const GetUserProfile = async () => {
//   return new Promise((resolve, reject) => {
//     API.get(Routes.userProfile)
//     .then(e => {
//       store.dispatch(setUserDetails(e?.data?.data));
      
//       resolve(e);
//     })
//     .catch(err => {
//       reject(err);
//     })
//     .finally(() => {
      
//     });
//   });
// };

// export const UpdateUserInfo = async (data) => {
//   console.log('data', data)
//   return new Promise((resolve, reject) => {
//     API.post(Routes.updateUser, data,  { toast: true })
//     .then(e => {
//       console.log('e', e)
//       resolve(e);
//     })
//     .catch(err => {
//       reject(err);
//     })
//     .finally(() => {
      
//     });
//   });
// };

// export const ChangePassword = async (data) => {
//   return new Promise((resolve, reject) => {
//     API.post(Routes.changePassword, data,  { toast: true })
//     .then(res => {
//       resolve(res);
//     })
//     .catch(err => {
//       reject(err);
//     })
//     .finally(() => {
      
//     });
//   });
// };

// export const DeleteAccountAPI = () => {
//   return new Promise((resolve, reject) => {
//       API.post(Routes.deleteAccount, { toast: true })
//           .then(res => resolve(res))
//           .catch(err => reject(err))
//           .finally();
//   });
// }
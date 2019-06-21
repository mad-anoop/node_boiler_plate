export const userDataTemplate = ({
  email_verification = null,
  first_name = null,
  last_name = null,
  profile_image = null,
}) => ({
  firstName: first_name,
  lastName: last_name,
  profileImage: profile_image,
  emailVerification:email_verification
});

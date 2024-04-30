export const getUserId = () => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    return user?.id;
}
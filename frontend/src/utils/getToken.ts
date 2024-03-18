

const getToken: any = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token")
    return token;
  }
};

export default getToken;
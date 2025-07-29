export const signup = async (req, res) => {
    const { email, password, fullName } = req.body;

    try{
        if(!email || !password || !fullName) {
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 8){
            return res.status(400).json({message: "Password must contain atleast 8 characters"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({messages: "Invalid email format"});
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: "Email already exists"})
        }

    } catch (error) {

    }
}

export const login = async (req, res) => {
    res.send('login');
}

export const logout = async (req, res) => {
    res.send('logout');
}

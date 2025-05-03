const Users = require('../models/Users');

// Thêm người dùng (Test)
const addUser = async (req, res) => {
    try {
        const data = {
            name: 'Ly Ly',
            password: '1191',
            email: 'll@gmail.com',
        };
        const user = new Users(data);
        await user.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};


//POST /users/authenticate
// Xác thực người dùng
const authenticateUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await Users.findOne({ email: data.email });

        if (user && user.password === data.password) {
            res.json({ message: 'success', user });
        } else {
            res.json({ message: 'fail' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

// Đăng ký người dùng
const registerUser = async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, password } = req.body;

        // Kiểm tra email đã tồn tại chưa
        const existingEmail = await Users.findOne({ email });
        if (existingEmail) return res.status(400).json({ message: 'Email đã được sử dụng' });

        // Lưu người dùng mới mà không mã hóa mật khẩu
        const newUser = new Users({ name, email, password });

        await newUser.save();
        res.status(201).json({ message: 'Đăng ký thành công', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm người dùng theo email
        const user = await Users.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: 'Email không tồn tại' });

        // So sánh mật khẩu trực tiếp (không mã hóa)
        if (password !== user.password) {
            return res.status(400).json({ success: false, message: 'Mật khẩu không chính xác' });
        }

        // Trả về JSON chứa URL để FE tự động điều hướng
        res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            user: { id: user._id, email: user.email, name: user.name }, // Đảm bảo trả về name
            redirectUrl: 'http://shineluxstore.infinityfreeapp.com/' // FE sẽ dùng URL này để chuyển hướng
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server', error });
    }
};

module.exports = {
    addUser,
    authenticateUser, 
    registerUser, 
    loginUser 
};
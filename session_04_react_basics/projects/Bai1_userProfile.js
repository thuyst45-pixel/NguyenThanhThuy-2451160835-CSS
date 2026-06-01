function UserProfile() {
    return (
        <div className="profile">
            <h1>Hồ sơ cá nhân</h1>
            <img src="photo.jpg" alt="Ảnh đại diện"
            />
            <table>
                <tbody>
                    <tr>
                        <td>Họ tên:</td>
                        <td>Minh Anh</td>
                    </tr>

                    <tr>
                        <td>Email:</td>
                        <td>ma8719670@gmail.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default UserProfile;
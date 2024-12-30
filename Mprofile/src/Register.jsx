const RegisterForm = ({ isOpen, onClose, children}) => {

    if (!isOpen) return null;

    return (
        <div className="flex inset z-50 bg-opacity-50 bg-black w-10/12 h-[80%]">
            <div>
                <h1>Register</h1>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Register</button>
                </form>
                <button onClick={onClose}>close</button>
                {children}
            </div>
        </div>
    )
}

export default RegisterForm;

    // firstName
    // lastName
    // middleName
    // dateOfBirth
    // nationality
    // maritalStatus
    // placeOfBirth
    // sex
    // gender
    // religion
    // address
    // phoneNumber
    // email
    // occupation
    // bloodType
    // emergencyContact
    // Parent Deets
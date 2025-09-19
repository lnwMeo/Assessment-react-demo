import { LoginForm } from "@/components/login-form"

const loginpage = () => {
    return (
        <div className="max-w-screen-xl flex justify-center  mx-auto my-auto">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm />
            </div>
        </div>
    )
}
export default loginpage
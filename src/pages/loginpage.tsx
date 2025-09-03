import { LoginForm } from "@/components/login-form"

const loginpage = () => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center ">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm />
            </div>
        </div>
    )
}
export default loginpage
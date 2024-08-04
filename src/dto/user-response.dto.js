export const userResponseDto = (user) => {
    return {
        first_name: user.first_name,
        email: user.email,
        role: user.role
    }
}


/* first_name
"Fredy"
last_name
"Romero"
email
"fred@gmail.com"
password
"$2b$10$ck.17cWmTgtVKJ6T7IyXYOxfklYlKT7mgBVSxx6n6uJeYnpGGE5Pm"
age
32
role
"user" */
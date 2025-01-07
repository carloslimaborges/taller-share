// ------------------------------------
// prevent unnecessary re-renders
function App({ count }) {
    return <div>{count}</div>;
}

//---> Add your solution here
const App = React.memo(({ count }) => {
    return <div>{count}</div>;
});

// ------------------------------------
// Refactor this class component into a functional component using hooks
class Counter extends React.Component {
    state = { count: 0 };

    increment = () => {
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        return <button onClick={this.increment}>{this.state.count}</button>;
    }
}

//---> Add your solution here
const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount((prevCount) => prevCount + 1);
    };

    return (
        <button onClick={increment}>{count}</button>
    );

}

// ------------------------------------
// Refactor this code using object destructuring
const user = props.user;
const name = user.name;
const age = user.age;

//---> Add your solution here
const { user: { name, age } } = props;

// ------------------------------------
// Identify issues and propose improvements
function fetchData() {
    let data;
    fetch('/api/data')
        .then((response) => {
            data = response.json();
        });
    return data;
}

//---> Add your solution here
async function fetchData() {
    try {
        const res = await fetch('/api/data');
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


// ------------------------------------
// Analyze and optimize the following API response
const response = {
    "data": [
        { "id": 1, "details": "...large payload..." },
        { "id": 2, "details": "...large payload..." }
    ]
}

//---> Add your solution here
const response = {
    "data": [
        { "id": 1, "actual_relevant_property_1": "value", },
        ...
    ]
}
// create additional endpoints for other details


// ------------------------------------
// Review the following API implementation for a password reset functionality:
// - Identify security flaws in the implementation.
// - Rewrite the function to address these flaws.
// - Describe how you would test this functionality for vulnerabilities.
const express = require('express')
const app = express();

app.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).send('User not found');
    user.password = newPassword;
    await saveUser(user);
    res.send('Password updated successfully');
});

//---> Add your solution here
// 1. First thing is that there is no previous password to check against, so the attacker could change anyone's password
// 2. We don't want to disclose the data showed in lines 98, 99. It enables a brute force attack to gather users
// 3. We set the error variable and leave it to the end to avoid the attacker measuring the time for the response,
// if we fail early as we usually do to improve readability and performance, then this becomes an issue
app.post('/reset-password', async (req, res) => {
    let error = false;
    const { email, oldPassword, newPassword } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
        error = true;
    }
    if (!checkCurrentPassword(email, oldPassword)) {
        error = true;
    }
    if (!error) {
        user.password = newPassword;
        await saveUser(user);
        res.send('Password updated successfully');
    } else {
        res.status(400).send('Problem while changing password');
    }
});
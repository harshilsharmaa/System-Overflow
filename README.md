# System-Overflow

This an website which provide a platform to upload questions and answer them.

View Website: https://website-harshil.herokuapp.com/

# Technologies:
- <a href="https://nodejs.org/en/" target="_blank">Nodejs</a>
- <a href="https://expressjs.com/" target="_blank">Express</a>
- <a href="https://www.mongodb.com/" target="_blank">MongoDB(Database)</a>
- <a href="https://handlebarsjs.com/" target="_blank">Handelbars</a>
 

# Features

 <table>
        <thead>
            <tr>
                <th>Function</th>
                <th>Description</th>
                <th>Route</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>To add new Question</td>
                <td>
                    <ul>
                        <li> Logedin user can add question by clicking on "Ask Question" button </li>
                        <li>It will render to a form where user can upload question</li>
                    </ul>
                </td>
                <td>/askquestion</td>
            </tr>
            <tr>
                <td>To view a single question</td>
                <td>
                    <ul>
                        <li>On clicking on a questions title on index page then it will show the whole description of quetions
                        including images etc.</li>
                        <li>Also shows the answers of this quetions if have.</li>
                        <li>And a textarea to add new answer.</li>
                    </ul>
                </td>
                <td>/show/:id</td>
            </tr>
            <tr>
                <td>See Questions by Filters</td>
                <td>
                    <ol>
                        <li>
                            <h4>By Tag</h4>
                            <h5>To view Question with specific tag.</h5>
                        </li>
                        <li>
                            <h4>Active Questions</h4>
                            <h5>To view Question which have 0 answer.</h5>
                        </li>
                    </ol>
                 </td>
                <td>
                    <ol>
                        <li>/bytag</li>
                        <li>/activequestions</li>
                    </ol>
                </td>
            </tr>
            <tr>
                <td>
                    To post answer to a question
                </td>
                <td>
                    User can answer a question. 
                </td>
                <td>
                    /show/:id/answer
                </td>
            </tr>
            <tr>
                <td>
                    Login or Signup
                </td>
                <td>User can login through google, for this google aouth 2.0 is used.</td>
                <td>/login</td>
            </tr>
            <tr>
                <td>
                    Logout
                </td>
                <td>User can logout and session will be deleted.</td>
                <td>/Logout</td>
            </tr>
            <tr>
                <td>Contact</td>
                <td>Anyone can contact the admin and the email is sent to the admin.</td>
                <td>/contact</td>
            </tr>
            <tr>
                <td>User Profile</td>
                <td>Logedin user can see his/her profile.
                    <ul>
                        <li>View and delete question ask by himeself</li>
                    </ul>
                </td>
                <td>/profile/:id</td>
            </tr>
            <tr>
                <td>Delete Account</td>
                <td>This will delete the user profile.
                    <ul>
                        <li>All the qustions and answers post by hime will also be deleted.</li>
                    </ul>
                </td>
                <td>/deleteaccount/:id</td>
            </tr>
        </tbody>
    </table>

# Installation

<ul>
        <li>Fork/clone this project to your local machine.</li>
        <li>Open this folder with any code editor.</li>
        <li>And run below code in terminal.</li>
        <code>npm install</code>
        <li>To run this website run following command in terminal.</li>
        <code>node ./app.js</code>
        <li><h5>Note: config.env will not be downloaded with this because this is in .gitignore file so you have to add your own mongodb database link in db.js file in config folder.</h5></li>
    </ul>

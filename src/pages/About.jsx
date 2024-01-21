import { Navbar } from "../components/Navbar";

export const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-md">
          <h2 className="text-3xl font-bold mb-4">About the Project</h2>
          <p className="text-gray-800 leading-relaxed">
            Welcome to our React project! This project is built using React for
            the frontend. Here's a brief overview of the project structure:
          </p>
          <ul className="list-disc pl-6 mt-4">
            <li>**src/components:**</li>
            <li>**src/pages:**</li>
            <li>**src/App.js:**</li>
            <li>**src/index.js:**</li>
            <li>**public/index.html:** the app.</li>
          </ul>
          <h4 className="text-xl font-bold mt-4">Difficulties Faced</h4>
          <p className="text-gray-800 ">
            Difficulties I have faced while working on this project is when I
            was making the login page. It was a new experience for sending the
            data in the Form Data fromat. And also when hashing the password
            using <em>SHA256</em>, this helped me know about{" "}
            <em>crypto-js library</em>
          </p>
          <h4 className="text-xl font-bold mt-4">How to Start the project </h4>
          <ul className="list-disc pl-6 mt-4">
            <li>Clone the repository from github </li>
            <li>
              Then install the dependencies using <em>npm install</em>
            </li>
            <li>
              Run the development server using <em>npm run dev</em>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

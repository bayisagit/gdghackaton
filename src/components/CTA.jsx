import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate =useNavigate()
  return (
    <div className="bg-blue-500 text-white dark:bg-gray-900 dark:text-white py-20">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join Thousands of Users Taking Control of Their Health
        </h2>
        <p className="text-lg mb-8">
          Sign up now and get your first health assessment free.
        </p>
        <button onClick={()=>navigate('/signup')} className="bg-white text-blue-600 dark:bg-gray-900 dark:text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-100 dark:hover:bg-gray-800 transition">
          Create Your Account
        </button>
      </div>
    </div>
  );
};

export default CTA;

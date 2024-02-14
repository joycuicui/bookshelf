import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Avatar from "../../public/female_avata.svg";

const About = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="px-44 py-36 min-h-96 text-gray-700">
          <p className="text-3xl mb-6">Your Gateway to Literary Delight</p>
          <p className="text-3xl">
            Where Every Read is an Adventure Waiting to Unfold
          </p>
        </div>
        <div className="flex bg-neutral-100">
          <div className="w-1/2 border-r">
            <img src="/book3.jpg" alt="Book in nature" className="w-full" />
          </div>
          <div className="w-1/2 px-20 py-14">
            <p className="text-lg font-semibold my-4">What Is Book Haven?</p>
            <p className="leading-8 mt-14">
              Introducing Book Haven, your personalized virtual bookshelf
              designed to enhance your reading journey! With Book Haven, you can
              effortlessly track your reading progress, share insightful
              reviews, and stay motivated to finish every book you start.
              Immerse yourself in the joy of reading with our intuitive progress
              bar, which dynamically updates as you flip through pages, keeping
              you engaged and on track. Never miss a beat with our convenient
              reminders and notifications, delivered straight to your inbox.
              Join Book Haven today and unlock the ultimate reading experience,
              where every page turned brings you closer to literary fulfillment.
            </p>
          </div>
        </div>
        <div className="flex bg-neutral-100">
          <div className="w-1/2 px-20 py-14">
            <p className="text-lg font-semibold my-4">Who Are We?</p>
            <p className="leading-8 mt-14">
              We are a team of passionate full-stack web developers with a deep
              love for literature. Our journey began from a shared enthusiasm
              for reading, which led us to create BookHaven—a manifestation of
              our commitment to merging technology with our love for books. With
              our combined expertise in web development and our unwavering
              dedication to promoting the joy of reading, we aim to create
              meaningful experiences for book lovers everywhere.
            </p>
          </div>
          <div className="w-1/2 border-r">
            <img src="/book4.jpg" alt="Book in nature" className="w-full" />
          </div>
        </div>
        <div className="px-44 py-36 min-h-96 text-gray-700">
          <p className="text-3xl mb-8">Contact Us</p>
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <img
                src="/picture_about_bilqis.png"
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <a href="https://github.com/bahmed32">
                  <FaGithub className="inline mr-4" />
                  Bilqis Ahmed
                </a>
                <div>
                  <MdEmail className="inline mr-4" />
                  bilqis.ali32@gmail.com
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <img
                src={Avatar}
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <a href="https://github.com/joycuicui">
                  <FaGithub className="inline mr-4" />
                  Joy Cui
                </a>
                <div>
                  <MdEmail className="inline mr-4" />
                  joy.test.0331@gmail.com
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <img
                src={Avatar}
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <a href="https://github.com/c22quiambao">
                  <FaGithub className="inline mr-4" />
                  Christel Quiambao
                </a>
                <div>
                  <MdEmail className="inline mr-4" />
                  christelquiambao@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-neutral-50 mt-10 border-t p-5 text-gray-500 text-xs flex flex-col justify-center items-center gap-2">
        <div className="flex gap-3">
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/search" className="hover:underline">
            Search
          </Link>
        </div>
        <div>&copy; {new Date().getFullYear()} BookHaven</div>
      </footer>
    </>
  );
};

export default About;

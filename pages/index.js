import Head from "next/head";
import { useState } from "react";

function HomePage({ jobs }) {
  const [value, setValue] = useState('');
  return (
    <>
      <Head>
        <title>London Remote Only Jobs</title>
      </Head>
      <header className="hero">
        <section className="hero__content">
          <h1 className="hero__title">London Remote Working Jobs</h1>
          <p className="hero__subtitle">
            Find remote working roles to help you get back on your feet while
            London is on lockdown.
          </p>
          <a className="button" href="#jobs">
            View Latest Roles
          </a>
        </section>
      </header>
      <main className="container">
        <div className="alert">
          <strong>Head Up!</strong> This site periodically fetches the latest remote working jobs so jobs may disappear from the listings below
        </div>
        <input
          className="search"
          type="text"
          value={value}
          onChange={e => setValue(e.currentTarget.value)}
          placeholder={`Search jobs (e.g: ${jobs[0].title})`}
        />
        <section className="jobs" id="jobs">
          {jobs.filter(j => j.title.includes(value)).map(job => {
            return (
              <a href={job.url} target="_blank" key={job.id} className="job">
                <h3 className="job__title">{job.title}</h3>
                <p className="job__company">{job.companyName} - {job.location}</p>
                <ul className="job__description">{job.summary.map(s => <li key={job.id + s}>{s}</li>)}</ul>
              </a>
            );
          })}
        </section>
      </main>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
        html,
        body {
          margin: 0;
          padding: 0;
          background-color: #fcfcfc;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
        }
      `}</style>
      <style jsx>{`
        .alert {
          padding: 1em;
          background-color: #ffbcb8;
          color: #73120c;
          border-radius: 4px;
          margin-bottom: 1em;
        }
        .hero {
          padding: 5em 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
            url(https://images.unsplash.com/photo-1488747279002-c8523379faaa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80)
              center center;
        }
        .hero__content {
          text-align: center;
          color: #fff;
        }
        .hero__title {
          font-size: 3em;
          margin: 0;
          text-shadow: 1px 2px #585858;
        }
        .hero__subtitle {
          font-size: 1.2em;
          margin: 1em 0;
          margin-bottom: 2em;
          text-shadow: 1px 2px #585858;
        }
        .button {
          display: inline-block;
          padding: 1em 2em;
          background-color: #f44336;
          border-radius: 4px;
          border: 1px solid #c71e12;
          color: #fff;
          text-decoration: none;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s background-color ease-in;
        }
        .button:hover {
          background-color: #c71e12;
        }

        .container {
          max-width: 900px;
          padding: 2em 0;
          margin: 0 auto;
        }

        .search {
          width: 100%;
          padding: 1.25em;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1em;
          outline: none;
        }

        .jobs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 1em;
          margin-top: 1em;
        }

        .job {
          padding: 1em;
          display: block;
          color: #000;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .job__title {
          margin-top: 0;
          margin-bottom: 0.25em;
        }

        .job__company {
          font-size: 0.8em;
          color: #585858;
          margin: 0;
        }

        .job__description {
          margin: 0;
          margin-top: .5em;
          padding: 0;
          list-style: none;
        }
        
        .job__description li {
          margin-bottom: .5em;
          font-size: 0.9em;
          line-height: 1.5em;
        }

        @media screen and (max-width: 768px) {
          .hero {
            padding: 5em 2em;
          }
          .hero__title {
            font-size: 1.5em;
            margin: 0;
            text-shadow: 1px 2px #585858;
          }
          .hero__subtitle {
            font-size: 1em;
            line-height: 2em;
            margin: 1em 0;
            margin-bottom: 2em;
            text-shadow: 1px 2px #585858;
          }
          .button {
            width: 100%;
          }
          .container {
            padding: 2em 1em;
          }
          .jobs {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </>
  );
}

export const getStaticProps = async () => {
  const fs = require("fs");
  const path = require("path");
  const jsonPath = path.join(process.cwd(), "/data/jobs.json");
  const jobs = JSON.parse(fs.readFileSync(jsonPath).toString());
  return {
    props: { jobs }
  };
};

export default HomePage;

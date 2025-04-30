import React from "react";

const BoardOfDirector = ({ title, imgUrl }) => {
  // console.log("imgUrl", imgUrl);
  return (
    <>
      <section className="about-poster">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="poster-image">
                <img
                  src={process.env.NEXT_PUBLIC_STRAPI_URL + imgUrl}
                  alt="about"
                  className="img-fluid mb-5"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BoardOfDirector;

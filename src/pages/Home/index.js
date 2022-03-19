import React, { useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";
import { apiURL } from "../../utils/apiURL";
import { Images } from "../../utils/Images";

import NavbarComponent from "../../components/User/Navbar/index";
import SearchComponent from "../../components/User/Search/index";
import DoctorsListComponet from "../../components/User/DoctorsList/index";

const Index = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [doctor, setDoctor] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //fetch Doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${apiURL}/client/doctors`);
      setDoctor(response.data.doctor);
      setLoading(false);
    } catch (error) {
      if (error) console.log(console.response);
    }
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      alert("Geoloacation is not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    setLoading(true);
    fetchDoctors();
  }, []);
  return (
    <>
      <div className="home">
        <NavbarComponent />
        <div className="header py-4">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-6 content d-none d-lg-block">
                <h1>Search Doctors</h1>
                <h5>Choose your nearest specialist</h5>
              </div>
              <div className="col-12 col-lg-6 image-column text-center">
                <img src={Images.PeopleSearch} alt="..." />
              </div>
            </div>
          </div>
        </div>

        {/* Nearest or suggested Doctor */}
        <div className="suggested-doctors">
          <DoctorsListComponet doctors={doctor} loading={isLoading} />
        </div>

        <SearchComponent lat={latitude} lang={longitude} />
      </div>
    </>
  );
};

export default Index;

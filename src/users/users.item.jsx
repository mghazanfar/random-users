import { useState } from "react";
import Lightbox from "react-image-lightbox";
import "./users.scss";
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app


export const UserItem = ({ user }) => {
  const [lightbox, setLightbox] = useState(false);
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="user-item">
      {lightbox && (
        <Lightbox
          mainSrc={user.picture.large}
          onCloseRequest={() => setLightbox(false)}
        />
      )}
      <div className="header">
        <div className="d-flex">
          <div className="avatar" onClick={() => setLightbox(true)}>
            <img src={user.picture.medium} alt="avatar" className="avatar" />
          </div>
          <h4>{`${user.name.title}. ${user.name.first} ${user.name.last}`}</h4>
        </div>
      </div>
      <div>
        <h6>@{user.login.username}</h6>
        <h6>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </h6>
        <h6>Date of birth: {user.dob.date.split("T")[0].replaceAll("-", "/")}</h6>
        <h6>Phone: {user.phone.replace("-", "")}</h6>
        <a
          rel="noreferrer"
          href={`https://www.google.com/maps/search/?api=1&query=${user.location.coordinates.latitude},${user.location.coordinates.longitude}`}
          target="_blank"
        >
          <h6>Address: {`${user.location.street.number} ${user.location.street.name} ${user.location.city} ${user.location.state} ${user.location.country} `}</h6>
        </a>

        {!showMore &&<b onClick={() => setShowMore(true)}>See more</b>}
        {showMore &&<>
        <h6>Gender: {user.gender}</h6>
        <h6>ID: {user.login.uuid}</h6>
        <h6>Registered on: {user.registered.date.split("T")[0].replaceAll("-", "/")}</h6>
        <h6>Nationality: {user.nat}</h6>
        </>}
      </div>
    </div>
  );
};

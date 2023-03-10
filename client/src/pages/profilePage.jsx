import React, { useState, useEffect } from "react";
import { RiEditFill } from "react-icons/ri";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { GetLiked, GetUploaded } from "../api/authApi";
import SongsSection from "../elements/songsSection";
import SectionPlacholder from "../elements/sectionPlacholder";
import { DidIFollow, Follow, UnFollow, UpdateImage } from "../api/authApi";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const profile = useLoaderData();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [uploaded, setUploaded] = useState();
  const [Liked, setLiked] = useState();
  const [iFollow, setIFollow] = useState(2);
  const [loading, setLoading] = useState(true);
  const [loadingS1, setLoadingS1] = useState(true);
  const [loadingS2, setLoadingS2] = useState(true);

  useEffect(() => {
    trackState();
    trackSection();
  }, [userId]);

  const trackState = async () => {
    try {
      const { status } = await DidIFollow(userId);
      if (status == 200) {
        setIFollow(0);
      } else if (status == 204) {
        setIFollow(1);
      } else {
        setIFollow(2);
      }
      setLoading(false);
    } catch (error) {
      toast("Something Wrong Happen", { type: "error" });
    }
  };

  const trackSection = async () => {
    setLoadingS1(true);
    setLoadingS2(true);
    try {
      const data1 = await GetUploaded(userId);
      const data2 = await GetLiked(userId);
      setUploaded(data1);
      setLiked(data2);
    } catch (error) {
      toast("Something Wrong Happen", { type: "error" });
    }
    setLoadingS1(false);
    setLoadingS2(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await UpdateImage(e.target.files[0]);
      navigate(`/profile/${userId}`);
    } catch (error) {
      toast("Something Wrong Happen", { type: "error" });
    }
  };

  return (
    <div>
      <div className="info-container">
        <div className="info__img">
          <img className="img--" src={profile.photoUrl} />
          {iFollow === 2 && (
            <div className="edit__profile">
              <input
                onChange={handleUpdate}
                className="hide"
                type="file"
                accept="image/*"
              />
              <RiEditFill className="edit_icon" size={"28px"} />
            </div>
          )}
        </div>
        <div className="name_holder">
          <h5 className="profile__name">{profile.username}</h5>
          {loading ? (
            <button className="card__follow-loading">Loading...</button>
          ) : iFollow === 0 ? (
            <button
              onClick={async () => {
                try {
                  setLoading(true);
                  await UnFollow(userId);
                  setIFollow(1);
                  setLoading(false);
                } catch (error) {
                  setLoading(false);
                  toast("Something Wrong Happen", { type: "error" });
                }
              }}
              className="card__follow un--follow"
            >
              UnFollow
            </button>
          ) : iFollow === 1 ? (
            <button
              onClick={async () => {
                try {
                  setLoading(true);
                  await Follow(userId);
                  setIFollow(0);
                  setLoading(false);
                } catch (error) {
                  setLoading(false);
                  toast("Something Wrong Happen", { type: "error" });
                }
              }}
              className="card__follow"
            >
              Follow
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="status">
        <div className="number">
          <span className="number-value">{profile.followers}</span>
          Followers
        </div>
        <div className="number">
          <span className="number-value">{profile.following}</span>
          Following
        </div>
        <div className="number">
          <span className="number-value">{profile.songs}</span>
          Songs
        </div>
      </div>

      {loadingS1 ? (
        <SectionPlacholder />
      ) : (
        <SongsSection data={uploaded} name={"Uploaded Songs"} />
      )}

      {loadingS2 ? (
        <SectionPlacholder />
      ) : (
        <SongsSection data={Liked} name={"Liked Songs"} />
      )}
    </div>
  );
};

export default ProfilePage;

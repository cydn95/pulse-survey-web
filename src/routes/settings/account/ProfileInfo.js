import React, { useState, useEffect } from "react";

import Input from "Components/Input";
import Button from "Components/Button";

import styles from "./form.scss";

const ProfileInfo = ({ profile, onChangeProfile }) => {
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [team, setTeam] = useState("");
  const [organization, setOrganization] = useState("");

  useEffect(() => {
    setId(profile ? profile.id : 0);
    setFirstName(profile ? profile.firstName : "");
    setLastName(profile ? profile.lastName : "");
    setEmail(profile ? profile.email : "");
    setTeam(profile ? profile.team : "");
    setOrganization(profile ? profile.organization : "");
  }, [profile]);

  const handleReset = (e) => {
    setId(profile ? profile.id : 0);
    setFirstName(profile ? profile.firstName : "");
    setLastName(profile ? profile.lastName : "");
    setEmail(profile ? profile.email : "");
    setTeam(profile ? profile.team : "");
    setOrganization(profile ? profile.organization : "");
  };

  const handleSubmit = () => {
    onChangeProfile({
      id,
      firstName,
      lastName,
      email,
      team,
      organization,
    });
  };

  return (
    <div className={styles["form-wrapper"]}>
      <h2>Edit your profile</h2>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Input
          className={styles.input}
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={(value, e) => setFirstName(value)}
        />
        <Input
          className={styles.input}
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={(value, e) => setLastName(value)}
        />
        {/* <Input
            className={styles.input}
            label="Email"
            name="email"
            value={email}
          /> */}
        <Input
          className={styles.input}
          label="Department"
          name="team"
          value={team}
          onChange={(value, e) => setTeam(value)}
        />
        <Input
          className={styles.input}
          label="Organization"
          name="organization"
          value={organization}
          onChange={(value, e) => setOrganization(value)}
        />
        <div className={styles.actions}>
          <Button default={false} onClick={handleReset}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;

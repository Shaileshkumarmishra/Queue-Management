import React from "react";
import { Box, Typography, Avatar, Card, CardContent } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const ProfileCard = ({ username = "User", profilePicture, email, bio }) => {
  return (
    <Card
      sx={{
        width: 350,
        borderRadius: "12px",
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        transition: "0.3s",
        "&:hover": { boxShadow: "0 6px 15px rgba(0,0,0,0.3)" },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Avatar
            src={profilePicture || undefined}
            sx={{
              width: 72,
              height: 72,
              border: "3px solid #000",
              fontSize: "24px", // Adjust font size for better visibility
              backgroundColor: profilePicture ? "transparent" : "#000", // Dark background if no image
              color: "#fff", // White text if no image
            }}
          >
            {!profilePicture && username.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#000" }}>
              {username}
            </Typography>
            {email && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                <EmailIcon sx={{ fontSize: 18, color: "#000" }} />
                <Typography variant="body2" sx={{ color: "#000" }}>
                  {email}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {bio && (
          <Typography variant="body2" sx={{ mt: 2, color: "#000" }}>
            {bio}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;

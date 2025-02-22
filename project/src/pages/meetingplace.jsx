import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Meetingplace = () => {
  const meetingRef = useRef(null);
  const { appointmentId } = useParams();
  const [emailStatus, setEmailStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  useEffect(() => {
    const initializeMeeting = async () => {
      try {
        const appId = 1567329841;
        const serverSecret = "d48531e9a78d6305379d6095ee7ae8cf";

        const meetingData = JSON.parse(localStorage.getItem('currentMeetingData'));
        const currentURL = window.location.href;

        // Determine if the current user is a doctor or patient
        const isDoctor = localStorage.getItem('token') !== null; // Doctor will have auth token
        const userName = isDoctor ? "Doctor" : "Patient";

        // Generate a unique user ID
        const userId = isDoctor 
          ? `doctor_${Date.now()}`
          : `patient_${Date.now()}`;

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appId,
          serverSecret,
          appointmentId,
          userId,
          userName
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);

        const sendEmailNotification = async () => {
          setIsLoading(true);
          try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/send-meeting-link`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                email: meetingData?.patientEmail,
                meetingLink: currentURL,
                appointmentId: appointmentId,
                patientName: meetingData?.patientName,
                doctorName: meetingData?.doctorName,
                appointmentTime: meetingData?.appointmentTime,
                appointmentDate: meetingData?.appointmentDate,
                customMessage: customMessage
              })
            });

            if (!response.ok) {
              throw new Error('Failed to send meeting notification');
            }
            setEmailStatus("Meeting link sent successfully!");
          } catch (error) {
            console.error('Error sending meeting notification:', error);
            setEmailStatus("Failed to send meeting link. Please try again.");
          } finally {
            setIsLoading(false);
          }
        };

        // Configure room options
        const roomConfig = {
          container: meetingRef.current,
          sharedLinks: [{
            name: "copy link",
            url: currentURL
          }],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          showScreenSharingButton: true,
          showUserList: true, // Show participants list
          showPreJoinView: true, // Show preview before joining
          showLeavingView: true, // Show leave confirmation
          showRoomDetailsButton: true, // Show room info
          turnOnMicrophoneWhenJoining: true,
          turnOnCameraWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showAudioVideoSettingsButton: true,
        };

        // Join the room with configuration
        await zc.joinRoom(roomConfig);

        // Only set sendEmailNotification if user is a doctor
        if (isDoctor) {
          window.sendEmailNotification = sendEmailNotification;
        }

      } catch (error) {
        console.error("Failed to initialize meeting:", error);
        setEmailStatus("Failed to initialize meeting. Please try again.");
      }
    };

    initializeMeeting();

    return () => {
      // Only clear meeting data if user is a doctor
      if (localStorage.getItem('token')) {
        localStorage.removeItem('currentMeetingData');
        window.sendEmailNotification = null;
      }
    };
  }, [appointmentId, customMessage]);

  const handleSendEmail = () => {
    if (window.sendEmailNotification) {
      window.sendEmailNotification();
    }
  };

  // Only show email controls for doctors
  const isDoctor = localStorage.getItem('token') !== null;

  return (
    <div className="flex flex-col gap-4 p-4">
      {isDoctor && (
        <div className="w-full">
          <textarea
            className="w-full p-2 border rounded-md"
            rows="3"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Add a custom message for the patient (optional)"
          />
          <button
            className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded-md ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            onClick={handleSendEmail}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Meeting Link to Patient'}
          </button>
        </div>
      )}

      {emailStatus && (
        <Alert className={`${
          emailStatus.includes('successfully') ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <AlertDescription>{emailStatus}</AlertDescription>
        </Alert>
      )}

      <div ref={meetingRef} className="w-full h-[600px]" />
    </div>
  );
};

export default Meetingplace;
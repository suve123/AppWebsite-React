import MeetingMinder from '../../components/Meetingminder';


const MeetingMinderPage = ({ SummaryText, setSummaryText, setTriggerEffect }) => (
  <MeetingMinder
    SummaryText={SummaryText}
    setSummaryText={setSummaryText}
    setTriggerEffect={setTriggerEffect}
  />
);

export default MeetingMinderPage;

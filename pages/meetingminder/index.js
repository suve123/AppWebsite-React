import MeetingMinder from '../../components/MeetingMinder/MeetingMinder';

const MeetingMinderPage = ({ SummaryText, setSummaryText, setTriggerEffect }) => (
  <MeetingMinder
    SummaryText={SummaryText}
    setSummaryText={setSummaryText}
    setTriggerEffect={setTriggerEffect}
  />
);

export default MeetingMinderPage;

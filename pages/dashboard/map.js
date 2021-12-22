import LocationSearchInput from "../../components/google-map/LocationSearchInput";
import MapSec from "../../components/google-map/MapSec";

const Map = () => {
  return (
    <section className="dashboard">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.948015677899!2d51.38592428444883!3d35.7028968363903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e01b8b3ee2fa3%3A0xefc70bfa1781b114!2z2KrZiNiz2qnYp9mI2Kg!5e0!3m2!1sfa!2s!4v1640089060947!5m2!1sfa!2s"
        width="100%"
        height="450"
        allowfullscreen="true"
        loading="lazy"
      ></iframe>
    </section>
  );
};

export default Map;

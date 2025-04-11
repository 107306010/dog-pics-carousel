import { getBreeds } from "./api/api";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";

const Home = async () => {
  const breeds = await getBreeds();
  return (
    <Layout>
      <div className="text-3xl w-fit mb-2">Search for your favorite dogs</div>
      <SearchBar breeds={breeds} />
    </Layout>
  );
};

export default Home;

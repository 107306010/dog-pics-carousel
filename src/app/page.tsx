import { API_ROUTES, API_CONFIG } from "@/config";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";

const Home = async () => {
  const result = await fetch(API_ROUTES.BREED_LIST, {
    next: { revalidate: API_CONFIG.REVALIDATE_TIME },
  });
  const { breeds } = await result.json();
  return (
    <Layout>
      <div className="text-3xl w-fit mb-2">Search for your favorite dogs</div>
      <SearchBar breeds={breeds} />
    </Layout>
  );
};

export default Home;

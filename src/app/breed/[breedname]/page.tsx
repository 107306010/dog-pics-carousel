import { BreedPageProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import BreedImage from "@/components/BreedImage";
import styles from "./page.module.css";
import { get_image } from "@/lib/image";
import { getBreedsImages } from "@/app/api/api";
import Layout from "@/components/Layout";

const BreedPage = async (props: { params: BreedPageProps }) => {
  const { breedname } = await props.params;

  const image = await getBreedsImages(breedname, 50);
  // const { message } = await result.json();

  const breedname_arr = breedname.split("%20");
  const breedname_title =
    breedname_arr.length === 1
      ? `${breedname_arr[0]}`
      : `${breedname_arr[0]} ${breedname_arr[1]}`;

  return (
    <Layout>
      <div className="w-1/2">
        <div className={styles.bar}>
          <Link href="/" className={styles.icon}>
            <Image alt="back arrow" src={get_image("svg", "left_arrow")} />
          </Link>
          <div className="text-3xl w-full text-center">{breedname_title}</div>
        </div>
        <div className={styles.image_grid_wrap}>
          <BreedImage breed={breedname} image={image} />
        </div>
      </div>
    </Layout>
  );
};

export default BreedPage;

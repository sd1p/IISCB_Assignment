"use client";
import useImage from "@/hooks/useImage";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Results = () => {
  const { image, annotatedImage, metadata } = useImage();
  const imageUrl = image ? URL.createObjectURL(image) : "";
  const annotatedImageSrc = annotatedImage
    ? `data:image/jpeg;base64,${annotatedImage}`
    : "";
  return (
    image && (
      <div className="flex flex-col mx-4 gap-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div>
            <h4 className="text-center">Orignal Image</h4>
            <Image
              src={imageUrl}
              alt="Image"
              className="max-w-full h-auto pt-2"
              layout="responsive"
              width={300}
              height={150}
              objectFit="contain"
            />
          </div>
          <div>
            <h4 className="text-center">Annotated Image</h4>
            <Image
              src={annotatedImageSrc}
              alt="Image"
              className="max-w-full h-auto pt-2"
              layout="responsive"
              width={300}
              height={150}
              objectFit="contain"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <h5 className="text-center text-slate-300">
            Vehicles identified in the picture.
          </h5>
          <div className="w-[70vh] ">
            <Table className="border-[1px] border-slate-700 rounded-3xl">
              <TableHeader>
                <TableRow>
                  <TableHead className="">Vehicle type</TableHead>
                  <TableHead className="text-center">Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metadata &&
                  Object.entries(metadata).map(([vehicleType, count]) => {
                    if (count) {
                      return (
                        <TableRow key={vehicleType}>
                          <TableCell className="capitalize">
                            {vehicleType}
                          </TableCell>
                          <TableCell className="text-center">
                            {Number(count)}
                          </TableCell>{" "}
                        </TableRow>
                      );
                    }
                    return null;
                  })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    )
  );
};

export default Results;

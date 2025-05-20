import * as React from "react";

function HomeSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 15 16"
    >
      <path
        fill={props.color}
        fillRule="evenodd"
        d="M.207 5.263 7.184.102c.213-.129.404-.143.632 0l6.977 5.161a.53.53 0 0 1 .207.414v9.635a.54.54 0 0 1-.523.516h-4.71a.54.54 0 0 1-.523-.516v-2.925c0-.962-.769-1.72-1.744-1.72s-1.744.758-1.744 1.72v2.925a.54.54 0 0 1-.523.516H.523A.54.54 0 0 1 0 15.312V5.677c0-.16.078-.317.207-.414m13.747.672L7.5 1.161 1.047 5.935v8.86h3.662v-2.408c0-1.516 1.254-2.753 2.791-2.753s2.79 1.237 2.79 2.753v2.409h3.664z"
        clipRule="evenodd"
        opacity="1"
      ></path>
    </svg>
  );
}

export default HomeSvg;

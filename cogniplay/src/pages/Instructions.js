
import React from 'react';
import './Instructions.css'


const Instructions = () => {
  return (
    <div className='instructions'>
    <div className='insBox'>
    Welcome to CogniPlay! This game is designed to enhance and assess your child's cognitive skills through engaging levels. Each level targets a specific skill, and players will automatically progress to the next level upon completion. Our advanced AI generates detailed reports based on your child's performance, which you can review anytime on the account page. Enjoy the game and watch as your child’s abilities grow!
    </div>
    
    <svg className='instructionsBG' width="1479" height="900" viewBox="0 0 1479 900" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1479" height="900" fill="#171717"/>
<path d="M514.76 153V145.96H524.168V113.32H514.76V106.28H541.64V113.32H532.232V145.96H541.64V153H514.76ZM552.303 153V117.8H560.111V124.52H562.287L560.111 126.376C560.111 123.475 560.943 121.213 562.607 119.592C564.314 117.971 566.639 117.16 569.583 117.16C573.039 117.16 575.791 118.312 577.839 120.616C579.93 122.92 580.975 126.013 580.975 129.896V153H572.975V130.728C572.975 128.595 572.42 126.952 571.311 125.8C570.202 124.648 568.644 124.072 566.639 124.072C564.676 124.072 563.119 124.669 561.967 125.864C560.858 127.059 560.303 128.765 560.303 130.984V153H552.303ZM603.606 153.576C600.918 153.576 598.571 153.149 596.566 152.296C594.561 151.443 592.982 150.269 591.83 148.776C590.721 147.24 590.123 145.448 590.038 143.4H598.038C598.123 144.509 598.657 145.405 599.638 146.088C600.662 146.771 601.985 147.112 603.606 147.112H606.422C608.385 147.112 609.857 146.728 610.838 145.96C611.819 145.192 612.31 144.147 612.31 142.824C612.31 141.587 611.862 140.627 610.966 139.944C610.113 139.219 608.769 138.749 606.934 138.536L602.582 137.896C598.571 137.341 595.627 136.275 593.75 134.696C591.873 133.117 590.934 130.749 590.934 127.592C590.934 124.307 592.043 121.768 594.262 119.976C596.481 118.141 599.745 117.224 604.054 117.224H606.486C610.411 117.224 613.547 118.099 615.894 119.848C618.241 121.597 619.499 123.944 619.67 126.888H611.67C611.542 125.949 611.009 125.181 610.07 124.584C609.174 123.987 607.979 123.688 606.486 123.688H604.054C602.219 123.688 600.875 124.029 600.022 124.712C599.211 125.352 598.806 126.312 598.806 127.592C598.806 128.787 599.169 129.683 599.894 130.28C600.619 130.835 601.793 131.24 603.414 131.496L607.958 132.136C612.139 132.733 615.211 133.864 617.174 135.528C619.179 137.149 620.182 139.56 620.182 142.76C620.182 146.173 619.009 148.84 616.662 150.76C614.358 152.637 610.945 153.576 606.422 153.576H603.606ZM647.165 153C643.794 153 641.149 152.061 639.229 150.184C637.352 148.307 636.413 145.725 636.413 142.44V125.032H626.877V117.8H636.413V107.88H644.477V117.8H657.981V125.032H644.477V142.44C644.477 144.659 645.565 145.768 647.741 145.768H657.341V153H647.165ZM668.516 153V117.8H676.068V124.52H678.052L675.684 128.616C675.684 124.819 676.537 121.96 678.244 120.04C679.951 118.12 682.468 117.16 685.796 117.16C689.593 117.16 692.58 118.333 694.756 120.68C696.932 123.027 698.02 126.269 698.02 130.408V132.968H689.636V130.984C689.636 128.723 689.039 126.973 687.844 125.736C686.692 124.499 685.092 123.88 683.044 123.88C680.953 123.88 679.332 124.499 678.18 125.736C677.071 126.973 676.516 128.723 676.516 130.984V153H668.516ZM720.075 153.64C715.595 153.64 712.075 152.403 709.515 149.928C706.955 147.411 705.675 143.997 705.675 139.688V117.8H713.675V139.624C713.675 141.885 714.23 143.635 715.339 144.872C716.448 146.067 718.027 146.664 720.075 146.664C722.08 146.664 723.638 146.067 724.747 144.872C725.899 143.635 726.475 141.885 726.475 139.624V117.8H734.475V139.688C734.475 143.997 733.174 147.411 730.571 149.928C727.968 152.403 724.47 153.64 720.075 153.64ZM758.642 153.64C755.655 153.64 753.031 153.085 750.77 151.976C748.551 150.824 746.823 149.224 745.586 147.176C744.349 145.085 743.73 142.632 743.73 139.816V130.984C743.73 128.125 744.349 125.672 745.586 123.624C746.823 121.576 748.551 119.997 750.77 118.888C753.031 117.736 755.655 117.16 758.642 117.16C763.079 117.16 766.621 118.312 769.266 120.616C771.911 122.877 773.298 125.971 773.426 129.896H765.426C765.298 128.061 764.637 126.653 763.442 125.672C762.29 124.648 760.69 124.136 758.642 124.136C756.509 124.136 754.823 124.733 753.586 125.928C752.349 127.08 751.73 128.744 751.73 130.92V139.816C751.73 141.992 752.349 143.677 753.586 144.872C754.823 146.067 756.509 146.664 758.642 146.664C760.69 146.664 762.29 146.173 763.442 145.192C764.637 144.168 765.298 142.739 765.426 140.904H773.426C773.298 144.829 771.911 147.944 769.266 150.248C766.621 152.509 763.079 153.64 758.642 153.64ZM800.665 153C797.294 153 794.649 152.061 792.729 150.184C790.852 148.307 789.913 145.725 789.913 142.44V125.032H780.377V117.8H789.913V107.88H797.977V117.8H811.481V125.032H797.977V142.44C797.977 144.659 799.065 145.768 801.241 145.768H810.841V153H800.665ZM820.864 153V145.704H833.152V125.032H822.464V117.8H840.832V145.704H851.712V153H820.864ZM836.352 111.912C834.731 111.912 833.451 111.507 832.512 110.696C831.573 109.843 831.104 108.712 831.104 107.304C831.104 105.896 831.573 104.787 832.512 103.976C833.451 103.123 834.731 102.696 836.352 102.696C837.973 102.696 839.253 103.123 840.192 103.976C841.131 104.787 841.6 105.896 841.6 107.304C841.6 108.712 841.131 109.843 840.192 110.696C839.253 111.507 837.973 111.912 836.352 111.912ZM873.575 153.576C870.588 153.576 867.986 153.021 865.767 151.912C863.591 150.76 861.884 149.16 860.647 147.112C859.452 145.021 858.855 142.568 858.855 139.752V131.048C858.855 128.232 859.452 125.8 860.647 123.752C861.884 121.661 863.591 120.061 865.767 118.952C867.986 117.8 870.588 117.224 873.575 117.224C876.604 117.224 879.207 117.8 881.383 118.952C883.559 120.061 885.244 121.661 886.439 123.752C887.676 125.8 888.295 128.211 888.295 130.984V139.752C888.295 142.568 887.676 145.021 886.439 147.112C885.244 149.16 883.559 150.76 881.383 151.912C879.207 153.021 876.604 153.576 873.575 153.576ZM873.575 146.6C875.708 146.6 877.351 146.024 878.503 144.872C879.698 143.677 880.295 141.971 880.295 139.752V131.048C880.295 128.787 879.698 127.08 878.503 125.928C877.351 124.776 875.708 124.2 873.575 124.2C871.484 124.2 869.842 124.776 868.647 125.928C867.452 127.08 866.855 128.787 866.855 131.048V139.752C866.855 141.971 867.452 143.677 868.647 144.872C869.842 146.024 871.484 146.6 873.575 146.6ZM897.678 153V117.8H905.486V124.52H907.662L905.486 126.376C905.486 123.475 906.318 121.213 907.982 119.592C909.689 117.971 912.014 117.16 914.958 117.16C918.414 117.16 921.166 118.312 923.214 120.616C925.305 122.92 926.35 126.013 926.35 129.896V153H918.35V130.728C918.35 128.595 917.795 126.952 916.686 125.8C915.577 124.648 914.019 124.072 912.014 124.072C910.051 124.072 908.494 124.669 907.342 125.864C906.233 127.059 905.678 128.765 905.678 130.984V153H897.678ZM948.981 153.576C946.293 153.576 943.946 153.149 941.941 152.296C939.936 151.443 938.357 150.269 937.205 148.776C936.096 147.24 935.498 145.448 935.413 143.4H943.413C943.498 144.509 944.032 145.405 945.013 146.088C946.037 146.771 947.36 147.112 948.981 147.112H951.797C953.76 147.112 955.232 146.728 956.213 145.96C957.194 145.192 957.685 144.147 957.685 142.824C957.685 141.587 957.237 140.627 956.341 139.944C955.488 139.219 954.144 138.749 952.309 138.536L947.957 137.896C943.946 137.341 941.002 136.275 939.125 134.696C937.248 133.117 936.309 130.749 936.309 127.592C936.309 124.307 937.418 121.768 939.637 119.976C941.856 118.141 945.12 117.224 949.429 117.224H951.861C955.786 117.224 958.922 118.099 961.269 119.848C963.616 121.597 964.874 123.944 965.045 126.888H957.045C956.917 125.949 956.384 125.181 955.445 124.584C954.549 123.987 953.354 123.688 951.861 123.688H949.429C947.594 123.688 946.25 124.029 945.397 124.712C944.586 125.352 944.181 126.312 944.181 127.592C944.181 128.787 944.544 129.683 945.269 130.28C945.994 130.835 947.168 131.24 948.789 131.496L953.333 132.136C957.514 132.733 960.586 133.864 962.549 135.528C964.554 137.149 965.557 139.56 965.557 142.76C965.557 146.173 964.384 148.84 962.037 150.76C959.733 152.637 956.32 153.576 951.797 153.576H948.981Z" fill="white"/>
<path d="M234.51 728.228L199.147 620.404L241.985 606.828C260.06 601.1 272.977 591.65 280.737 578.478C288.497 565.306 289.863 550.788 284.836 534.923C279.694 518.698 270.215 507.617 256.399 501.679C242.469 495.381 226.286 495.153 207.849 500.996L127.053 526.6L107 463.322L184.542 438.749C211.293 430.271 235.972 427.807 258.578 431.355C281.07 434.544 300.481 443.073 316.811 456.943C333.141 470.813 345.076 489.646 352.617 513.443C359.588 535.437 361.001 556.216 356.858 575.781C353.077 595.23 344.595 612.4 331.412 627.291C318.23 642.181 300.85 653.244 279.275 660.478L294.7 709.153L234.51 728.228ZM294.792 841.249C283.585 844.8 273.519 844.419 264.594 840.106C255.555 835.432 249.378 827.867 246.064 817.41C242.751 806.954 243.5 797.393 248.312 788.726C253.009 779.699 260.961 773.409 272.168 769.858L288.435 764.703C299.642 761.151 309.527 761.589 318.091 766.017C327.016 770.331 333.193 777.896 336.621 788.713C339.934 799.169 339.242 808.911 334.545 817.938C329.733 826.605 321.724 832.714 310.517 836.265L294.792 841.249Z" fill="white"/>
<path d="M1174.74 381.916L1204.98 330.73L1225.12 342.905C1233.63 348.042 1241.81 349.862 1249.68 348.365C1257.55 346.868 1263.74 342.389 1268.24 334.926C1272.86 327.295 1273.94 319.733 1271.51 312.241C1269.17 304.58 1263.67 298.129 1255 292.889L1216.99 269.927L1234.98 240.163L1271.45 262.201C1284.03 269.804 1293.53 278.669 1299.95 288.796C1306.47 298.753 1309.82 309.344 1310 320.566C1310.18 331.789 1306.89 342.997 1300.13 354.191C1293.88 364.536 1286.18 372.274 1277.05 377.404C1268.08 382.636 1258.39 385.231 1247.97 385.186C1237.56 385.142 1227.19 382.122 1216.89 376.128L1203.05 399.023L1174.74 381.916ZM1151.08 444.71C1145.81 441.525 1142.48 437.43 1141.09 432.425C1139.81 427.251 1140.65 422.205 1143.62 417.286C1146.59 412.368 1150.62 409.359 1155.69 408.258C1160.87 406.988 1166.1 407.945 1171.37 411.13L1179.02 415.754C1184.29 418.939 1187.53 422.982 1188.75 427.884C1190.14 432.889 1189.29 437.935 1186.22 443.023C1183.25 447.942 1179.17 451.036 1173.99 452.306C1168.92 453.407 1163.74 452.364 1158.47 449.179L1151.08 444.71Z" fill="white"/>
<path d="M1309.15 738.447L1331 761.992L1321.59 770.551C1317.62 774.162 1315.41 778.12 1314.98 782.425C1314.54 786.73 1315.91 790.625 1319.07 794.11C1322.32 797.675 1326.06 799.403 1330.32 799.296C1334.65 799.268 1338.84 797.412 1342.89 793.729L1360.64 777.588L1373.28 791.489L1356.24 806.98C1350.37 812.324 1344.31 815.877 1338.08 817.638C1331.92 819.479 1325.92 819.582 1320.08 817.946C1314.24 816.311 1308.94 812.879 1304.18 807.652C1299.79 802.82 1296.97 797.644 1295.72 792.122C1294.39 786.673 1294.54 781.255 1296.17 775.866C1297.8 770.477 1300.96 765.577 1305.65 761.165L1295.93 750.472L1309.15 738.447ZM1280.28 716.513C1282.74 714.274 1285.38 713.181 1288.18 713.235C1291.06 713.367 1293.54 714.582 1295.63 716.879C1297.72 719.176 1298.66 721.724 1298.45 724.522C1298.31 727.399 1297.01 729.957 1294.54 732.196L1290.97 735.445C1288.51 737.684 1285.91 738.741 1283.19 738.615C1280.38 738.561 1277.9 737.347 1275.74 734.97C1273.65 732.673 1272.68 730.086 1272.82 727.209C1273.03 724.411 1274.37 721.893 1276.83 719.654L1280.28 716.513Z" fill="white"/>
<path d="M1128.27 745.835L1086.52 765.235L1079 748.623C1075.83 741.614 1071.41 736.861 1065.73 734.363C1060.05 731.866 1054.14 732.009 1047.98 734.792C1041.69 737.639 1037.68 741.988 1035.95 747.838C1034.08 753.752 1034.76 760.283 1037.99 767.433L1052.17 798.764L1027.63 809.867L1014.02 779.797C1009.33 769.424 1007.16 759.598 1007.51 750.32C1007.72 741.105 1010.23 732.876 1015.04 725.634C1019.85 718.392 1026.86 712.683 1036.09 708.508C1044.62 704.649 1052.93 703.087 1061.01 703.821C1069.02 704.416 1076.35 707.013 1082.98 711.613C1089.61 716.214 1094.89 722.687 1098.84 731.035L1117.71 722.495L1128.27 745.835ZM1170.93 716.147C1172.9 720.493 1173.23 724.567 1171.92 728.369C1170.46 732.235 1167.71 735.085 1163.66 736.919C1159.6 738.754 1155.71 738.909 1151.99 737.384C1148.13 735.923 1145.22 733.019 1143.25 728.673L1140.4 722.365C1138.43 718.019 1138.13 714.016 1139.51 710.354C1140.82 706.551 1143.57 703.701 1147.77 701.803C1151.82 699.969 1155.78 699.782 1159.64 701.244C1163.36 702.768 1166.21 705.704 1168.17 710.049L1170.93 716.147Z" fill="white"/>
<path d="M363.965 99.7574L358.631 145.489L340.543 143.195C332.91 142.227 326.544 143.508 321.443 147.038C316.343 150.568 313.368 155.682 312.518 162.381C311.649 169.232 313.253 174.927 317.331 179.466C321.389 184.158 327.31 186.997 335.095 187.984L369.211 192.311L365.822 219.03L333.08 214.877C321.785 213.445 312.276 210.151 304.555 204.995C296.814 199.991 291.117 193.545 287.465 185.656C283.812 177.768 282.623 168.799 283.897 158.751C285.075 149.464 288.093 141.571 292.949 135.071C297.654 128.552 303.701 123.672 311.091 120.433C318.481 117.193 326.766 116.078 335.943 117.087L338.55 96.5342L363.965 99.7574ZM361.007 47.8692C365.739 48.4693 369.381 50.3235 371.934 53.4317C374.467 56.6922 375.454 60.5299 374.894 64.945C374.334 69.3602 372.43 72.754 369.183 75.1266C365.916 77.6515 361.916 78.6138 357.184 78.0137L350.315 77.1426C345.583 76.5425 342.017 74.698 339.617 71.6091C337.065 68.5009 336.078 64.6631 336.657 60.0958C337.217 55.6807 339.13 52.2107 342.398 49.6858C345.645 47.3132 349.635 46.427 354.367 47.0271L361.007 47.8692Z" fill="white"/>
</svg>


    
    </div>
  );
};

export default Instructions;
#!/bin/bash
cd BTCUSDT
echo '🚀解压文件中...'
rm *.csv
unzip '*.zip'
echo '🚀拼接文件中...'
cat *.csv > result.csv
echo '😄拼接文件完成'

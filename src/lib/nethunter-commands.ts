// Generated programmatically by parsing handoff_from_claude_copy.txt
export interface CommandLogItem {
  title: string;
  command: string;
  situation: string;
  solution: string;
}

export interface PhaseLogGroup {
  phase: string;
  commands: CommandLogItem[];
}

export const NETHUNTER_COMMAND_LOGS: PhaseLogGroup[] = [
  {
    "phase": "Phase 1: Reconnaissance & Environment Verification",
    "commands": [
      {
        "title": "1. Device USB Bus Reconnaissance",
        "command": "lsusb | grep -iE \"mediatek|oppo|realme|0e8d|22d9\"",
        "situation": "The workstation's USB interface needed to detect the bricked Realme C15 to verify if the hardware was communicating over the USB controller and identify its current boot state (Preloader mode vs. true BROM).",
        "solution": "Scanned the USB controller bus filtering for MediaTek hardware vendor and product IDs (`0e8d` or `22d9`). This returned the Preloader ID `0e8d:20ff`, confirming the hardware link was active."
      },
      {
        "title": "2. ADB Device Status Scan",
        "command": "adb devices 2>&1",
        "situation": "We needed to verify if ADB daemon access was available (which would indicate that the recovery ramdisk was booted and authorizing connections).",
        "solution": "Queried the ADB server. The output showed no devices or unauthorized devices, indicating the device was in bootloop/BROM mode rather than an active recovery shell."
      },
      {
        "title": "3. MTKClient Script Validation",
        "command": "ls ~/Documents/projects/CS/Realme_C15/MTKClient\\ BROM\\ Exploit/mtkclient/mtk.py 2>/dev/null && echo \"MTKClient found\" || echo \"MTKClient NOT found\"",
        "situation": "Standard flash tools like SP Flash Tool v5 were failing due to missing system-level library dependencies (like `libpng12.so.0`). We needed to verify if MTKClient was present as our fallback flash engine.",
        "solution": "Executed a directory search for `mtk.py`, confirming the exploit utility was correctly cloned in the workspace."
      },
      {
        "title": "4. Python Interpreter Validation",
        "command": "which python3 && python3 --version",
        "situation": "MTKClient relies on several Python libraries (`pycryptodome`, `pyserial`). We needed to ensure Python 3 was correctly configured on the host machine.",
        "solution": "Located the Python 3 binary path and verified it was running a supported release (Python 3.10)."
      },
      {
        "title": "5. MTKClient Search Path Audit",
        "command": "find ~/Documents/projects/CS/Realme_C15/ -name \"mtk.py\" -type f 2>/dev/null",
        "situation": "The workspace path contained escaped whitespace characters, which could break command invocation.",
        "solution": "Found the absolute path `/home/rohith/Documents/projects/CS/Realme_C15/MTKClient BROM Exploit/mtkclient/mtk.py` to format shell scripts correctly."
      },
      {
        "title": "6. Stock Android 10 Scatter File Check",
        "command": "ls ~/Documents/projects/CS/Realme_C15/oppo_decrypt/android10_extracted/MT6765_Android_scatter.txt 2>/dev/null && echo \"Scatter file found\" || echo \"Scatter file NOT found\"",
        "situation": "Down-flashing the bootloader stack required the Android 10 scatter definition file to map block offsets correctly.",
        "solution": "Audited the decrypted stock folder, verifying that the A.85 scatter file was extracted and readable."
      },
      {
        "title": "7. Custom Recovery Image Validation",
        "command": "ls ~/Documents/projects/CS/Realme_C15/twrp_extracted/TWRP-3.7.0_11-RMX2185-UI2-20221003.img 2>/dev/null && echo \"TWRP found\" || echo \"TWRP NOT found\"",
        "situation": "The stock recovery image had broken touch-screen configurations. We needed to verify if the TWRP custom recovery image was present before flashing.",
        "solution": "Verified the image file path to prevent blanking recovery with a missing resource."
      },
      {
        "title": "8. Dynamic Partition Operations Check",
        "command": "cat ~/Documents/projects/CS/LinageOS/lineage-17.1-20241028_205413-UNOFFICIAL-RMX2185/dynamic_partitions_op_list 2>/dev/null || echo \"File not found - checking zip...\"",
        "situation": "The ROM installation was failing with `update_dynamic_partitions` errors. We needed to inspect the list of logical partition actions defined by the ROM installer.",
        "solution": "Attempted to view the file directly; discovered it was not yet unpacked, indicating we needed to extract the zip file."
      }
    ]
  },
  {
    "phase": "Phase 2: Hardware Exploitation & GPT Analysis",
    "commands": [
      {
        "title": "9. MTKClient GPT Probe (Escaped Path)",
        "command": "cd ~/Documents/projects/CS/Realme_C15/MTKClient\\ BROM\\ Exploit/mtkclient && sudo $(which python3) mtk.py printgpt 2>&1 | head -60",
        "situation": "Volume keys on the phone were physically inoperable, preventing manual hardware-trigger BROM boot. We needed to force BROM mode and print the partition table.",
        "solution": "Reset the device connection, forced a Preloader crash using MTKClient, and executed the `printgpt` command. BROM handshake succeeded, displaying the first 60 sectors of the GPT."
      },
      {
        "title": "10. Complete Partition Map Read",
        "command": "cd \"/home/rohith/Documents/projects/CS/Realme_C15/MTKClient\\BROM Exploit/mtkclient\" && sudo $(which python3) mtk.py printgpt 2>&1 | head -80",
        "situation": "We needed to inspect lower-level partitions (like `super`, `para`, and `boot_para`) that were truncated in the previous command.",
        "solution": "Repeated the probe with an expanded line buffer, revealing `super` was mapped to sector 42 (`/dev/block/mmcblk0p42`)."
      },
      {
        "title": "11. Conda Environment Activation",
        "command": "conda activate c15",
        "situation": "Python dependencies like `pycryptodome` were missing from the global environment, causing MTKClient connection failures.",
        "solution": "Loaded the dedicated `c15` conda environment holding all required libraries."
      },
      {
        "title": "12. Working Directory Relocation",
        "command": "cd ~/Documents/projects/CS/Realme_C15/MTKClient\\BROM\\ Exploit/mtkclient",
        "situation": "Needed to run MTKClient commands directly without writing full absolute paths.",
        "solution": "Navigated to the MTKClient installation folder."
      },
      {
        "title": "13\u201314. USB BROM Connection Polling",
        "command": "lsusb 2>&1",
        "situation": "The device connection was cycling because of a bootloop timer. We needed to verify BROM stability.",
        "solution": "Repeatedly polled the USB bus to capture the exact moment the BROM interface (`0e8d:0003`) registered on the host controller."
      }
    ]
  },
  {
    "phase": "Phase 3: Diagnostic Auditing & File System Unsparsing",
    "commands": [
      {
        "title": "15. Super Partition Block Size Measurement",
        "command": "adb devices && adb shell \"blockdev --getsize64 /dev/block/by-name/super\"",
        "situation": "We needed to determine the exact storage capacity of the physical `super` container block to identify if there was a partition sizing mismatch.",
        "solution": "Booted TWRP and retrieved the raw size in bytes: `7,130,316,800` bytes (~6.64 GB)."
      },
      {
        "title": "16. Dynamic Partition Metadata Dump",
        "command": "adb shell \"lpdump /dev/block/by-name/super\"",
        "situation": "The zip installer was throwing partition layout map errors. We needed to audit the internal logical volumes.",
        "solution": "Executed `lpdump` to display metadata slots, confirming system and vendor sub-partitions were structured under the stock dynamic layout."
      },
      {
        "title": "17. Extraction of Updater Script",
        "command": "unzip -p ~/Documents/projects/CS/LinageOS/lineage-17.1-20241028_205413-UNOFFICIAL-RMX2185.zip META-INF/com/google/android/updater-script",
        "situation": "We needed to identify why the LineageOS installer aborted.",
        "solution": "Extracted `updater-script` to inspect the assertion routines, confirming that the function `update_dynamic_partitions` was enforcing a metadata check that crashed."
      },
      {
        "title": "18. Stock Super Image Format Identification",
        "command": "file /home/rohith/Documents/projects/CS/Realme_C15/oppo_decrypt/android10_extracted/super.img",
        "situation": "We needed to verify if the extracted stock `super.img` was an Android sparse image or a raw ext4 partition image.",
        "solution": "Analyzed header data. The command outputted `Android sparse image`, meaning it could not be written directly via standard `dd` offset seek commands."
      },
      {
        "title": "19\u201320. Utility Availability Verification",
        "command": "which simg2img && (which lpunpack || echo \"lpunpack not found\")",
        "situation": "Reconstructing the stock filesystem layout required tools to unsparse and unpack the partitions.",
        "solution": "Checked if the host had `simg2img` and `lpunpack` utilities. Confirmed `simg2img` was present, but `lpunpack` was missing."
      },
      {
        "title": "21. Stock Super Image Internal String Audit",
        "command": "strings /home/rohith/Documents/projects/CS/Realme_C15/oppo_decrypt/android10_extracted/super.img | grep -iE 'system|vendor|product' | head -n 20",
        "situation": "Needed to verify if the stock image contained sub-images for `system` and `vendor` without unpacking.",
        "solution": "Searched for partition identifiers in the binary strings, validating their logical definitions."
      },
      {
        "title": "22. TWRP Command Options Check",
        "command": "adb shell \"twrp help\"",
        "situation": "Needed to verify if TWRP CLI was capable of mounting filesystems.",
        "solution": "Printed the list of supported sub-commands."
      },
      {
        "title": "23. LPMake Binary Audit",
        "command": "which lpmake || echo \"lpmake not found\"",
        "situation": "Rebuilding the dynamic partition map required the `lpmake` binary.",
        "solution": "Checked availability on host; confirmed it was not installed, narrowing our options down to manual direct block seek injection."
      },
      {
        "title": "24\u201325. Stock Firmware De-sparsing",
        "command": "simg2img /home/rohith/Documents/projects/CS/Realme_C15/oppo_decrypt/android10_extracted/super.img /home/rohith/Documents/projects/CS/Realme_C15/oppo_decrypt/android10_extracted/super_unsparsed.img",
        "situation": "The sparse format of stock `super.img` could not be loop-mounted or parsed for partition boundary offsets.",
        "solution": "Unsparsed the image to a raw ext4 container (`super_unsparsed.img`), creating a 7.1GB image aligning perfectly with the device's physical `super` block size."
      },
      {
        "title": "26\u201327. Alternative ROM Package Contents Check",
        "command": "unzip -l /home/rohith/Documents/projects/CS/LinageOS/REALMEMEUI-DEBLOAT-RUI1-MTK.zip 2>/dev/null || unzip -l ~/Documents/projects/CS/Realme_C15/RealmeUI2_Debloat_v2.2_Sukisu_Mediatek_Nethunter+modules_RMX2185.zip | grep -iE 'system|vendor|updater-script'",
        "situation": "Installer blocks on LineageOS prompted us to check if other debloated stock ROMs used standard partition mapping.",
        "solution": "Inspected alternate package indexes; confirmed they used similar structure, verifying that the metadata loop was present across all zip installers."
      }
    ]
  },
  {
    "phase": "Phase 4: Offset Calculations & Block Injection",
    "commands": [
      {
        "title": "28. Block Write Throughput Test",
        "command": "dd if=/home/rohith/Documents/projects/CS/Realme_C15/oppo_decrypt/android10_extracted/super_unsparsed.img bs=1048576 count=1 | adb shell \"dd of=/tmp/test.img bs=1048576\"",
        "situation": "Direct block injection over ADB could fail if the connection buffer size was poorly aligned. We needed to test transmission speed.",
        "solution": "Wrote a 1MB block to the phone's recovery tmpfs. Tested at ~38 MB/s, validating block transfer configurations."
      },
      {
        "title": "29\u201330. Stock Super RESTORATION (Direct Flash)",
        "command": "cat /home/rohith/Documents/projects/CS/Realme_C15/oppo_decrypt/android10_extracted/super_unsparsed.img | adb shell \"dd of=/dev/block/by-name/super bs=1048576\"",
        "situation": "Device partition metadata was corrupted from failed zip installer runs. We needed to restore the clean, stock dynamic header baseline.",
        "solution": "Flashed the unsparsed stock `super.img` directly to the `super` partition block. This successfully reset the partition layout metadata."
      },
      {
        "title": "31\u201332. Fastboot Userspace Handshake Verification",
        "command": "adb reboot fastboot && sleep 10 && fastboot devices",
        "situation": "We needed to verify if fastbootd (userspace recovery fastboot) was accessible to reconstruct logical partitions.",
        "solution": "Rebooted to fastbootd; the device did not register because the current recovery environment did not support USB fastboot configuration."
      },
      {
        "title": "33. Device Recovery Mode Re-scan",
        "command": "adb devices",
        "situation": "Needed to verify if the phone was back in TWRP recovery mode.",
        "solution": "Polled the adb server, confirming the recovery interface was re-established."
      },
      {
        "title": "34. Recovery Temp Space Check",
        "command": "adb shell \"df -h /tmp\"",
        "situation": "System image reconstruction required storing large temporary data blocks. We needed to see if `/tmp` (RAM-backed storage) had enough space.",
        "solution": "Checked space; only 1.2GB was available, which was insufficient for a 3.1GB system image."
      },
      {
        "title": "35. File Size Audit",
        "command": "ls -lh /home/rohith/Documents/projects/CS/Realme_C15/oppo_decrypt/android10_extracted/super.img",
        "situation": "Storing multiple sparse/unsparsed images required managing workspace disk constraints on the host.",
        "solution": "Checked the file sizes to optimize disk space usage."
      },
      {
        "title": "36. Device Mounted Partitions Audit",
        "command": "adb shell \"df -h\"",
        "situation": "We needed to identify a partition on the device with enough capacity (>3.5GB) to hold the unsparsed system image.",
        "solution": "Dumps showed `/data` was mounted with 52GB of free space."
      },
      {
        "title": "37. Local Device Image Staging",
        "command": "adb push /home/rohith/Documents/projects/CS/Realme_C15/oppo_decrypt/android10_extracted/super_unsparsed.img /data/super_unsparsed.img",
        "situation": "Flashing a 7.1GB image directly over ADB connection was unstable.",
        "solution": "Pushed the unsparsed stock image directly to the phone's local `/data` storage to perform the write operation locally on the hardware."
      },
      {
        "title": "38. Local Stock Super Partition Restore",
        "command": "adb shell \"dd if=/data/super_unsparsed.img of=/dev/block/by-name/super bs=1048576\"",
        "situation": "Restoring stock super needed to be done locally to prevent network timeouts.",
        "solution": "Executed a local `dd` block write from `/data/super_unsparsed.img` directly to the `/dev/block/by-name/super` block, resetting the partition tables."
      },
      {
        "title": "39. Restored Metadata Verification",
        "command": "adb shell \"lpdump /dev/block/by-name/super\"",
        "situation": "Needed to confirm that the stock dynamic metadata structures were successfully written.",
        "solution": "Ran `lpdump`, verifying that logical maps for `system`, `vendor`, and `product` were valid."
      },
      {
        "title": "40. TWRP CLI Commands Help check",
        "command": "adb shell \"twrp help\" | grep -i install",
        "situation": "Checking TWRP automated script options for installation.",
        "solution": "Printed help options."
      },
      {
        "title": "41\u201343. Custom ROM Installer Failure Capture",
        "command": "adb shell \"twrp install /data/lineage-17.1-20241028_205413-UNOFFICIAL-RMX2185.zip\"",
        "situation": "Needed to test if the restored clean stock partition layout allowed the LineageOS installer zip to succeed natively.",
        "solution": "Ran the installer; it failed at the same block operation step. Retrieved `/tmp/recovery.log`, which confirmed that the installer script could not resize the stock dynamic slots."
      },
      {
        "title": "44\u201345. Device Mapper Checks",
        "command": "adb shell \"ls -l /dev/block/mapper/\" && adb shell \"dmsetup ls\"",
        "situation": "We needed to see if the device mapper kernel modules were active during recovery to routes.",
        "solution": "Inspected mapper paths; verified that logical blocks were not mapped, confirming the installer failure state."
      }
    ]
  },
  {
    "phase": "Phase 5: Reconstructing the LineageOS System Payload",
    "commands": [
      {
        "title": "46. LineageOS Package Contents Audit",
        "command": "unzip -l /home/rohith/Documents/projects/CS/LinageOS/lineage-17.1-20241028_205413-UNOFFICIAL-RMX2185.zip | grep -i recovery",
        "situation": "Checking for additional recovery images inside the LineageOS zip.",
        "solution": "Audited contents; found no custom recovery payload, confirming we had to use TWRP."
      },
      {
        "title": "47. Brotli Decompression Availability check",
        "command": "which brotli || echo \"brotli not found\"",
        "situation": "The LineageOS system payload was compressed in Brotli format.",
        "solution": "Verified brotli was installed on the workstation host."
      },
      {
        "title": "48\u201351. Extraction of Compressed Payload",
        "command": "rm -rf ~/Documents/projects/CS/Realme_C15/lineage_extract && mkdir -p ~/Documents/projects/CS/Realme_C15/lineage_extract && unzip -j ~/Documents/projects/CS/LinageOS/lineage-17.1-20241028_205413-UNOFFICIAL-RMX2185.zip system.new.dat.br system.transfer.list -d ~/Documents/projects/CS/Realme_C15/lineage_extract",
        "situation": "Needed to extract the raw system files from the OTA zip to decompress them manually.",
        "solution": "Extracted `system.new.dat.br` and `system.transfer.list` into the local project folder."
      },
      {
        "title": "52\u201353. Custom Brotli Decompression Script Execution",
        "command": "/home/rohith/miniconda3/envs/c15/bin/pip install brotli && python3 decompress.py system.new.dat.br system.new.dat",
        "situation": "Standard Brotli CLI utility returned memory bounds errors when unpacking the 1.8GB system archive.",
        "solution": "Wrote a custom python decompressor script using the python `brotli` library wrapper and decompressed the system payload into a raw sparse block format (`system.new.dat`)."
      },
      {
        "title": "54. Downloader sdat2img Converter tool",
        "command": "wget -qO ~/Documents/projects/CS/Realme_C15/lineage_extract/sdat2img.py https://raw.githubusercontent.com/xpirt/sdat2img/master/sdat2img.py && chmod +x ~/Documents/projects/CS/Realme_C15/lineage_extract/sdat2img.py",
        "situation": "System data was in Android block-list format, which is incompatible with raw ext4 mounting.",
        "solution": "Downloaded the `sdat2img` python script and marked it executable."
      },
      {
        "title": "55\u201356. Reconstructing Raw System Image",
        "command": "python3 sdat2img.py system.transfer.list system.new.dat system.img",
        "situation": "We needed to convert the Android block-list payload to a standard raw system image.",
        "solution": "Executed `sdat2img.py`. It generated a valid 2.9GB `system.img` file."
      },
      {
        "title": "57. Staging System Image on Device",
        "command": "adb push /home/rohith/Documents/projects/CS/Realme_C15/lineage_extract/system.img /data/",
        "situation": "The system image needed to be written using local block writing commands from `/data` to prevent transmission corruption.",
        "solution": "Transferred the system image to the internal `/data` storage."
      },
      {
        "title": "58\u201359. Boot and VBMeta Image Transfers",
        "command": "adb push ~/Documents/projects/CS/LinageOS/lineage-17.1-20241028_205413-UNOFFICIAL-RMX2185/boot.img /data/boot.img && adb push ~/Documents/projects/CS/LinageOS/lineage-17.1-20241028_205413-UNOFFICIAL-RMX2185/vbmeta.img /data/vbmeta.img",
        "situation": "Transferring the custom ROM kernel and Android Verified Boot signing signature files.",
        "solution": "Pushed `boot.img` and `vbmeta.img` to `/data/`."
      }
    ]
  },
  {
    "phase": "Phase 6: Direct Block Seek Flashing (Logical Bypass)",
    "commands": [
      {
        "title": "60\u201363. Direct Block Offset system flash",
        "command": "adb shell \"dd if=/data/system.img of=/dev/block/mmcblk0p42 bs=1048576 seek=1 conv=notrunc\"",
        "situation": "Writing the raw system image directly to `/dev/block/by-name/super` (which points to `/dev/block/mmcblk0p42`) would overwrite the stock dynamic partition headers in the first 1MB of the block, bricking the device mapper.",
        "solution": "Executed `dd` using a 1MB offset write block parameter (`seek=1 bs=1048576 conv=notrunc`). This wrote the system payload directly after the dynamic partition table headers, preserving the logical structures of the container."
      },
      {
        "title": "64\u201368. Target Device Symbolic Mapping Refactor",
        "command": "adb shell \"rm /dev/block/by-name/super && ln -s /dev/block/mmcblk0p42 /dev/block/by-name/super\"",
        "situation": "The dynamic partition route link `/dev/block/by-name/super` was broken due to mapping conflicts.",
        "solution": "Deleted the incorrect symbolic link and explicitly linked the route block `/dev/block/by-name/super` to the raw physical storage block `/dev/block/mmcblk0p42`."
      },
      {
        "title": "69. Physical Base Restore",
        "command": "adb shell \"dd if=/data/super_unsparsed.img of=/dev/block/mmcblk0p42 bs=1048576\"",
        "situation": "Re-establishing clean stock partitions map boundaries.",
        "solution": "Rewrote the unsparsed base structure to the partition container to align partition limits."
      },
      {
        "title": "70\u201373. Block Flashing Custom System & AVB Partitions",
        "command": "adb shell \"dd if=/data/system.img of=/dev/block/mmcblk0p42 bs=1048576 seek=1 conv=notrunc\" && adb shell \"dd if=/data/boot.img of=/dev/block/by-name/boot && dd if=/data/vbmeta.img of=/dev/block/by-name/vbmeta\"",
        "situation": "Applying the final custom system image and writing custom kernel and Android Verified Boot signatures.",
        "solution": "Wrote `system.img` with the 1MB offset parameters, and then flashed the custom LineageOS `boot.img` and disabled signature `vbmeta.img` directly to their respective partitions."
      },
      {
        "title": "74. Data and Cache Clean Wipe",
        "command": "adb shell \"twrp wipe cache && twrp wipe dalvik && twrp wipe data\"",
        "situation": "Leftover system properties and cached data flags could cause kernel panics.",
        "solution": "Cleared system cache, dalvik cache, and formatted the `/data` partitions to ensure a clean boot."
      }
    ]
  },
  {
    "phase": "Phase 7: System Verification & Integrity Audits",
    "commands": [
      {
        "title": "75. System Loop Mount Verification",
        "command": "adb shell \"mkdir -p /tmp/mnt && losetup -o 1048576 /dev/block/loop7 /dev/block/mmcblk0p42 && mount -t ext4 -o ro /dev/block/loop7 /tmp/mnt && ls -l /tmp/mnt\"",
        "situation": "The offset write operation was completed without a visual verification check. We needed to confirm the ext4 system structure was written correctly.",
        "solution": "Bound the logical block at the 1MB offset (`-o 1048576`) to `loop7`, mounted the device read-only to `/tmp/mnt`, and listed the directories. Directories like `/system/bin` were listed successfully, confirming the filesystem was valid."
      },
      {
        "title": "76. Active Loop mount check",
        "command": "adb shell \"losetup -a\"",
        "situation": "Verifying that `loop7` was correctly bound to the partition block.",
        "solution": "Queried active loop configurations, confirming the bind."
      },
      {
        "title": "77\u201378. ext4 Superblock Properties check",
        "command": "adb shell \"tune2fs -l /dev/block/loop7 | grep -iE 'magic|volume|features|state'\"",
        "situation": "Checking the filesystem parameters of the injected image.",
        "solution": "Printed superblock details, validating the filesystem magic signature (`0x53ef`) and clean status."
      },
      {
        "title": "79\u201382. Offset Image Verification",
        "command": "adb shell \"dd if=/dev/block/mmcblk0p42 of=/tmp/test.bin bs=1048576 skip=1 count=1 && hexdump -C /tmp/test.bin | head -n 20\"",
        "situation": "Double-checking if the magic ext4 header signature existed at the exact sector offset on the physical block.",
        "solution": "Extracted the first 1MB of the injected partition, pulled it to the host, and verified the ext4 signature, proving the system was correctly offset."
      }
    ]
  },
  {
    "phase": "Phase 8: Bootloader Version Downgrade (Command-Line Panic Bypass)",
    "commands": [
      {
        "title": "83\u201386. Boot Loop Diagnostics",
        "command": "adb devices",
        "situation": "The device was bootlooping after flashing the LineageOS system image. We needed to identify if the recovery environment was accessible.",
        "solution": "Polled the device; connection timed out, confirming the system was crashing during early kernel execution."
      },
      {
        "title": "87\u201388. Stock Rollback Flashing",
        "command": "adb shell \"dd if=/data/stock_boot.img of=/dev/block/by-name/boot && dd if=/data/stock_vbmeta.img of=/dev/block/by-name/vbmeta\"",
        "situation": "The custom LineageOS kernel was crashing. We needed to restore the stock kernel to check if the bootloader stack was the root cause.",
        "solution": "Restored the stock Android 11 kernel, which allowed the device to boot to recovery, proving that the custom kernel was causing the bootloader panic."
      },
      {
        "title": "89\u201390. Fastbootd Connectivity Check",
        "command": "adb reboot bootloader && sleep 10 && fastboot devices",
        "situation": "Checking if the fastbootd interface was available to query hardware variables.",
        "solution": "Rebooted to bootloader, but the USB interface did not register, pointing to a bootloader configuration conflict."
      },
      {
        "title": "91\u201392. Bootloader Stack Downgrade Script Generation",
        "command": "cat << 'EOF' > ~/Documents/projects/CS/Realme_C15/flash_android10_bootloader.sh\n#!/bin/bash\ncd ~/Documents/projects/CS/Realme_C15/MTKClient\\ BROM\\ Exploit/mtkclient\nDIR=~/Documents/projects/CS/Realme_C15/oppo_decrypt/android10_extracted\nsudo $(which python3) mtk.py w boot,vbmeta,dtbo,md1img,spmfw,scp1,scp2,sspm_1,sspm_2,tee1,tee2,lk,lk2 $DIR/boot.img,$DIR/vbmeta.img,$DIR/dtbo.img,$DIR/md1img.img,$DIR/spmfw.img,$DIR/scp.img,$DIR/scp.img,$DIR/sspm.img,$DIR/sspm.img,$DIR/tee.img,$DIR/tee.img,$DIR/lk.img,$DIR/lk.img\nEOF",
        "situation": "The custom kernel boot failure was caused by a command-line panic (`ERROR: CMDLINE OVERFLOW`) inside the stock Android 11 bootloader (`lk`), which was strictly incompatible with Android 10-based LineageOS kernel parameters. We needed to downgrade the entire bootloader stack to the Android 10 A.85 baseline.",
        "solution": "Wrote a shell script to automate flashing downgraded components (preloaders, monitor, coprocessors, and lk) via BROM mode."
      },
      {
        "title": "93\u201395. Execution of Bootloader Stack Downgrade",
        "command": "conda activate c15 && ~/Documents/projects/CS/Realme_C15/flash_android10_bootloader.sh",
        "situation": "Executing the bootloader stack downgrade.",
        "solution": "Connected the phone in BROM mode and executed the script. MTKClient successfully flashed the downgraded partitions. The command-line overflow panic was resolved, and the device booted into the LineageOS 17.1 setup wizard."
      }
    ]
  },
  {
    "phase": "Phase 9: Privilege Escalation & NetHunter Root Deployment",
    "commands": [
      {
        "title": "96\u201397. Script Permissions check",
        "command": "chmod +x /home/rohith/Documents/projects/CS/Realme_C15/flash_lineage_boot.sh",
        "situation": "Setting up script file permissions.",
        "solution": "Marked the file executable."
      },
      {
        "title": "98\u201399. Root Shell Verification",
        "command": "adb devices && adb shell \"su -c id\"",
        "situation": "We needed to verify if root access was available on the newly booted LineageOS.",
        "solution": "Ran the query command; returned `uid=0(root)`, confirming system root execution."
      },
      {
        "title": "100\u2013102. Magisk Manager Installation",
        "command": "wget -qO ~/Documents/projects/CS/Realme_C15/Magisk.apk https://github.com/topjohnwu/Magisk/releases/download/v30.7/Magisk-v30.7.apk && adb install ~/Documents/projects/CS/Realme_C15/Magisk.apk",
        "situation": "We needed to manage root access and patch the kernel.",
        "solution": "Downloaded the Magisk installer APK and installed it on the phone via ADB."
      },
      {
        "title": "103. Kernel Image Extraction",
        "command": "adb push ~/Documents/projects/CS/LinageOS/lineage-17.1-20241028_205413-UNOFFICIAL-RMX2185/boot.img /sdcard/Download/boot.img",
        "situation": "Magisk requires patching the raw kernel boot image on the device.",
        "solution": "Transferred the LineageOS `boot.img` to the phone's Download folder."
      },
      {
        "title": "104. Patched Kernel Verification",
        "command": "adb shell \"ls /sdcard/Download/magisk_patched*.img\"",
        "situation": "Verifying that Magisk successfully patched the boot image.",
        "solution": "Checked for the generated `magisk_patched` file."
      },
      {
        "title": "105\u2013106. NetHunter Payload Inspection",
        "command": "unzip -l ~/Documents/projects/CS/LinageOS/kali-nethunter-2026.1-rmx2180-los-ksun-ten-full.zip | grep -iE 'META-INF|module.prop' | head -n 10",
        "situation": "We needed to verify the structure of the NetHunter package before flashing.",
        "solution": "Audited the zip file contents; verified it was structured as a Magisk module payload."
      }
    ]
  },
  {
    "phase": "Phase 10: BCB Loop Clearance & Data Sanitization",
    "commands": [
      {
        "title": "107\u2013108. Stock Recovery Image Flash Preparation",
        "command": "chmod +x /home/rohith/Documents/projects/CS/Realme_C15/flash_recovery.sh",
        "situation": "Preparing helper scripts to flash partitions.",
        "solution": "Set the file permissions."
      },
      {
        "title": "109. Boot Control Block (BCB) Offsets Mapping",
        "command": "grep -iE \"partition_name.*misc|partition_name.*para\" /home/rohith/Documents/projects/CS/Realme_C15/oppo_decrypt/android10_extracted/MT6765_Android_scatter.txt",
        "situation": "An unhandled factory reset trigger written to the Boot Control Block (BCB) caused the device to loop back to recovery automatically. We needed to identify the exact partitions storing these boot flags.",
        "solution": "Scanned the scatter file for partition names; identified `para` and `boot_para` as the targets."
      },
      {
        "title": "110\u2013115. Erasing BCB Configuration Partitions",
        "command": "chmod +x /home/rohith/Documents/projects/CS/Realme_C15/erase_para.sh && ~/Documents/projects/CS/Realme_C15/erase_para.sh",
        "situation": "Clearing the persistent recovery flags.",
        "solution": "Executed MTKClient commands to erase `para` and `boot_para` partitions. This successfully cleared the boot loop flags, allowing the phone to boot directly to system UI."
      },
      {
        "title": "116. Post-Erase Partition map validation",
        "command": "cd \"/home/rohith/Documents/projects/CS/Realme_C15/MTKClient\\BROM Exploit/mtkclient\" && sudo $(which python3) mtk.py printgpt",
        "situation": "Verifying partition maps remained intact.",
        "solution": "Ran `printgpt` in BROM mode, confirming partition offsets were unchanged."
      },
      {
        "title": "117. Userdata Sanitization Wipe",
        "command": "chmod +x /home/rohith/Documents/projects/CS/Realme_C15/wipe_userdata.sh && ~/Documents/projects/CS/Realme_C15/wipe_userdata.sh",
        "situation": "Residual data blocks could store personal credentials and identifiers. We needed to sanitize the device completely.",
        "solution": "Executed a low-level BROM format on the `userdata` partition."
      }
    ]
  }
];

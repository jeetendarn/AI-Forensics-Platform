def classify_threat(title, description):

    combined_text = (
        title + " " + description
    ).lower()


    # =========================
    # CRITICAL THREATS
    # =========================

    critical_keywords = [

        "malware",
        "ransomware",
        "data exfiltration",
        "trojan",
        "backdoor",
        "credential dump"
    ]


    # =========================
    # HIGH THREATS
    # =========================

    high_keywords = [

        "brute force",
        "failed login",
        "powershell",
        "suspicious script",
        "usb",
        "privilege escalation"
    ]


    # =========================
    # MEDIUM THREATS
    # =========================

    medium_keywords = [

        "scan",
        "port scan",
        "network anomaly",
        "unknown process"
    ]


    # =========================
    # AI CLASSIFICATION LOGIC
    # =========================

    for keyword in critical_keywords:

        if keyword in combined_text:

            return "critical"


    for keyword in high_keywords:

        if keyword in combined_text:

            return "high"


    for keyword in medium_keywords:

        if keyword in combined_text:

            return "medium"


    return "low"

# =========================
# SIMPLE AI THREAT DETECTOR
# =========================

def analyze_file(filename):

    filename = filename.lower()

    suspicious_keywords = [

        "malware",
        "trojan",
        "hack",
        "payload",
        "virus",
        "backdoor",
        "exploit",
        "ransomware"
    ]

    dangerous_extensions = [

        ".exe",
        ".bat",
        ".ps1",
        ".dll",
        ".scr"
    ]

    threat_score = 0


    # =========================
    # KEYWORD DETECTION
    # =========================

    for keyword in suspicious_keywords:

        if keyword in filename:

            threat_score += 40


    # =========================
    # EXTENSION DETECTION
    # =========================

    for extension in dangerous_extensions:

        if filename.endswith(extension):

            threat_score += 50


    # =========================
    # AI VERDICT
    # =========================

    if threat_score >= 80:

        verdict = "Malicious"

        severity = "critical"

    elif threat_score >= 40:

        verdict = "Suspicious"

        severity = "high"

    else:

        verdict = "Safe"

        severity = "low"


    return {

        "threat_score": threat_score,

        "verdict": verdict,

        "severity": severity
    }
interface UserDetails {
  username: string;
  profileImage: string;
  score: number;
}

type LeaderboardData = {
  leaderboard: UserDetails[];
};

type ProfileData = {
  username: string;
  bio: string;
  age: number;
  twitter: string;
  email: string;
  birthday: string;
};

type User = UserDetails & Partial<ProfileData>

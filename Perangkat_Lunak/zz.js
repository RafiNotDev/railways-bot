import axios from 'axios';
let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`Username Instagramnya Mana Bg\nContoh .igstalk rfrdnap`)
  const formData = new URLSearchParams();
  formData.append('profile', text);
try {
    const profileRes = await axios.post('https://tools.xrespond.com/api/instagram/profile-info', formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'origin': 'https://bitchipdigital.com',
        'referer': 'https://bitchipdigital.com/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      }
    });

    const raw = profileRes.data?.data?.data;
    if (!raw || profileRes.data.status !== 'success') throw new Error('emror');

    const followers = raw.follower_count ?? 0;

    const postsForm = new URLSearchParams();
    postsForm.append('profile', text);

    const postsRes = await axios.post('https://tools.xrespond.com/api/instagram/media/posts', postsForm.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'origin': 'https://bitchipdigital.com',
        'referer': 'https://bitchipdigital.com/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      }
    });

    const items = postsRes.data?.data?.data?.items || [];

    let totalLike = 0;
    let totalComment = 0;

    for (const post of items) {
      totalLike += post.like_count || 0;
      totalComment += post.comment_count || 0;
    }

    const totalEngagement = totalLike + totalComment;
    const averageEngagementRate = followers > 0 && items.length > 0
      ? ((totalEngagement / items.length) / followers) * 100
      : 0;
      let caption = `
Data Di Temukan
Username: ${raw.username || '-'}
Nama: ${raw.full_name || '-'}
Bio: ${raw.biography || '-'}
Link: https://instagram.com/${text}
Followers: ${followers}
Following: ${raw.following_count ?? null}
posts: ${raw.media_count ?? null}
verified: ${raw.is_verified || raw.show_blue_badge_on_main_profile || false}
engagement_rate: ${parseFloat(averageEngagementRate.toFixed(2))}
`
conn.sendMessage(m.chat, {
            text: caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1,
                isForwarded: true,
                   forwardedNewsletterMessageInfo: {
                   newsletterJid: global.setting.idch,
                   serverMessageId: null,
                   newsletterName: global.setting.namach,
                   },
                   externalAdReply: {
                   title: `Mau Sewa Bot Wa??,  Chat`,
                   body: `Wa Owner:` + setting.owner,
                   thumbnailUrl: raw.hd_profile_pic_url_info?.url || raw.profile_pic_url_hd || setting.tampilan,
                   sourceUrl: '',
                   mediaType: 1,
                   renderLargerThumbnail: true
                   },
                },
            }, { quoted: m })
  } catch (err) {
    return m.reply('Error Bang')
  }
}
handler.tags = ['tools']
handler.help = handler.command = ['igstalk']
handler.register = true
export default handler